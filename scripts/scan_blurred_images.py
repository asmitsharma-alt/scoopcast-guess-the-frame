"""
Scan all movie frames in GUESSTHEFRAME/All_Movie_Frames to detect blurred, out-of-focus, or underexposed images.

Uses multi-metric computer vision analysis:
1. Variance of Laplacian (global edge sharpness)
2. Max Block Variance (4x4 grid - protects shallow depth-of-field close-ups where subject is sharp)
3. Normalized Sharpness Ratio (Laplacian / contrast to detect soft blur even in lit scenes)
4. Dynamic Range & Mean Brightness (identifies pitch-black or foggy frames)
"""

import os
import sys
import json
import time
import numpy as np
import cv2
from PIL import Image

# Ensure Windows console supports UTF-8
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

def analyze_frame(fpath):
    try:
        with Image.open(fpath) as pil_img:
            # Convert to grayscale
            gray = np.array(pil_img.convert('L'))
    except Exception as e:
        return None, str(e)

    h, w = gray.shape
    if h == 0 or w == 0:
        return None, "Empty image dimensions"

    mean_brightness = float(np.mean(gray))
    std_contrast = float(np.std(gray))

    # Laplacian variance across whole frame
    lap = cv2.Laplacian(gray, cv2.CV_64F)
    global_lap_var = float(lap.var())

    # Local block variance (4x4 grid): Checks if any quadrant is sharply in focus
    # (e.g., character's face in focus with blurry bokeh background)
    bh, bw = max(1, h // 4), max(1, w // 4)
    block_vars = []
    for r in range(4):
        for c in range(4):
            block = gray[r*bh : (r+1)*bh, c*bw : (c+1)*bw]
            if block.size > 0:
                block_lap = cv2.Laplacian(block, cv2.CV_64F)
                block_vars.append(float(block_lap.var()))

    max_block_var = max(block_vars) if block_vars else 0.0

    # Sobel Tenengrad gradient energy
    sobel_x = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
    sobel_y = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)
    tenengrad = float(np.mean(sobel_x**2 + sobel_y**2))

    # Normalized sharpness: ratio of edge frequency to overall contrast
    norm_sharpness = (global_lap_var / (std_contrast + 1e-4)) if std_contrast > 5 else 0.0

    # Classification logic:
    # 1. Pitch black / extreme darkness
    if mean_brightness < 16 and std_contrast < 15:
        category = "UNDEROXPOSED_DARK"
        is_blurry = True
        severity = "High"
        reason = f"Extreme darkness (mean brightness: {mean_brightness:.1f}, contrast: {std_contrast:.1f})"

    # 2. Severe blur: completely out-of-focus or heavy motion blur across the entire frame
    elif global_lap_var < 15.0 and max_block_var < 45.0:
        category = "SEVERE_BLUR"
        is_blurry = True
        severity = "High"
        reason = f"No sharp edges in any region (global lap: {global_lap_var:.1f}, max block: {max_block_var:.1f})"

    # 3. Moderate blur / soft focus: noticeably blurry for trivia game display
    elif (global_lap_var < 28.0 and max_block_var < 75.0) or (std_contrast > 20 and norm_sharpness < 0.45 and max_block_var < 90.0):
        category = "MODERATE_BLUR"
        is_blurry = True
        severity = "Medium"
        reason = f"Soft focus / smeared motion (global lap: {global_lap_var:.1f}, max block: {max_block_var:.1f}, norm: {norm_sharpness:.2f})"

    # 4. Low edge definition in foggy/misty scenes
    elif global_lap_var < 35.0 and max_block_var < 100.0 and std_contrast < 22:
        category = "LOW_CONTRAST_HAZE"
        is_blurry = True
        severity = "Low"
        reason = f"Low contrast hazy/foggy frame (contrast: {std_contrast:.1f}, max block: {max_block_var:.1f})"

    else:
        category = "SHARP"
        is_blurry = False
        severity = "None"
        reason = "Clean in-focus frame"

    return {
        "file": os.path.basename(fpath),
        "path": fpath,
        "width": w,
        "height": h,
        "mean_brightness": round(mean_brightness, 2),
        "contrast": round(std_contrast, 2),
        "global_lap_var": round(global_lap_var, 2),
        "max_block_var": round(max_block_var, 2),
        "tenengrad": round(tenengrad, 2),
        "norm_sharpness": round(norm_sharpness, 3),
        "category": category,
        "is_blurry": is_blurry,
        "severity": severity,
        "reason": reason
    }, None

def main():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    frames_dir = os.path.join(base_dir, 'GUESSTHEFRAME', 'All_Movie_Frames')

    if not os.path.isdir(frames_dir):
        print(f"Directory not found: {frames_dir}")
        sys.exit(1)

    all_files = sorted([f for f in os.listdir(frames_dir) if f.lower().endswith(('.webp', '.png', '.jpg', '.jpeg'))])
    total = len(all_files)
    print(f"============================================================")
    print(f"[SCAN] SCANNING {total} MOVIE FRAMES FOR BLUR & QUALITY DEFECTS")
    print(f"Directory: {frames_dir}")
    print(f"============================================================")

    results = []
    blurry_results = []
    start_time = time.time()

    for idx, fname in enumerate(all_files, 1):
        fpath = os.path.join(frames_dir, fname)
        info, err = analyze_frame(fpath)
        if err:
            print(f"[{idx}/{total}] ERROR reading {fname}: {err}")
            continue

        results.append(info)
        if info["is_blurry"]:
            blurry_results.append(info)

        if idx % 250 == 0 or idx == total:
            elapsed = time.time() - start_time
            rate = idx / elapsed if elapsed > 0 else 0
            print(f"  Processed {idx}/{total} frames ({idx/total*100:.1f}%) - {len(blurry_results)} blurred/defective flagged - {rate:.1f} frames/sec")

    # Group by category and severity
    severe = [r for r in blurry_results if r["category"] == "SEVERE_BLUR"]
    moderate = [r for r in blurry_results if r["category"] == "MODERATE_BLUR"]
    dark = [r for r in blurry_results if r["category"] == "UNDEROXPOSED_DARK"]
    haze = [r for r in blurry_results if r["category"] == "LOW_CONTRAST_HAZE"]

    print("\n" + "="*60)
    print("[REPORT] SCAN SUMMARY REPORT")
    print("="*60)
    print(f"Total Frames Scanned:       {total}")
    print(f"Crisp & Sharp Frames:       {total - len(blurry_results)} ({(total - len(blurry_results))/total*100:.1f}%)")
    print(f"Total Flagged as Blurred:   {len(blurry_results)} ({len(blurry_results)/total*100:.1f}%)")
    print(f"  - Severe Blur:            {len(severe)}")
    print(f"  - Moderate / Soft Blur:   {len(moderate)}")
    print(f"  - Underexposed / Dark:    {len(dark)}")
    print(f"  - Low Contrast / Hazy:    {len(haze)}")

    # Sort blurry results by global_lap_var ascending (worst blur first)
    blurry_results.sort(key=lambda x: (x["global_lap_var"], x["max_block_var"]))

    # Output detailed report file
    report_path = os.path.join(base_dir, "blurred_images_report.json")
    with open(report_path, "w", encoding="utf-8") as rf:
        json.dump({
            "scanned_at": time.strftime("%Y-%m-%d %H:%M:%S"),
            "total_scanned": total,
            "sharp_count": total - len(blurry_results),
            "blurry_count": len(blurry_results),
            "breakdown": {
                "severe_blur": len(severe),
                "moderate_blur": len(moderate),
                "underexposed_dark": len(dark),
                "low_contrast_haze": len(haze)
            },
            "blurry_frames": blurry_results
        }, rf, indent=2)

    print(f"\n[OUTPUT] Full detailed report saved to: {report_path}")

    # Print top worst blurred frames
    if severe:
        print("\n[ALERT] TOP SEVERELY BLURRED FRAMES (Out of focus / smeared motion):")
        for r in severe[:20]:
            print(f"  [-] {r['file']}")
            print(f"      Global LapVar: {r['global_lap_var']} | Max Block: {r['max_block_var']} | Contrast: {r['contrast']} | Brightness: {r['mean_brightness']}")

    if moderate:
        print("\n[WARN] SAMPLE MODERATELY BLURRED / SOFT FOCUS FRAMES:")
        for r in moderate[:15]:
            print(f"  [?] {r['file']}")
            print(f"      Global LapVar: {r['global_lap_var']} | Max Block: {r['max_block_var']} | Contrast: {r['contrast']}")

    if dark:
        print("\n[DARK] SAMPLE UNDEREXPOSED / NEAR-BLACK FRAMES:")
        for r in dark[:10]:
            print(f"  [.] {r['file']}")
            print(f"      Mean Brightness: {r['mean_brightness']} | Contrast: {r['contrast']}")

if __name__ == "__main__":
    main()
