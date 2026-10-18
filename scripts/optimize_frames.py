import os
import concurrent.futures
from PIL import Image

FRAMES_DIR = os.path.join(os.path.dirname(__file__), '..', 'GUESSTHEFRAME', 'All_Movie_Frames')

def process_image(filepath):
    orig_size = os.path.getsize(filepath)
    # If already small (< 160 KB), check dimensions quickly
    try:
        with Image.open(filepath) as im:
            w, h = im.width, im.height
            if w <= 1920 and h <= 1080 and orig_size <= 160 * 1024:
                return (0, 0, False)
            
            new_w, new_h = w, h
            if new_w > 1920:
                new_h = int(new_h * (1920 / new_w))
                new_w = 1920
            if new_h > 1080:
                new_w = int(new_w * (1080 / new_h))
                new_h = 1080

            needs_resize = (new_w, new_h) != (w, h)
            if needs_resize:
                im_proc = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
            else:
                im_proc = im
            
            temp_path = filepath + '.tmp.webp'
            im_proc.save(temp_path, 'WEBP', quality=80, method=5)
            new_size = os.path.getsize(temp_path)
            
            # Only keep if size improved or dimensions shrank
            if new_size < orig_size or needs_resize:
                os.replace(temp_path, filepath)
                return (orig_size, new_size, True)
            else:
                if os.path.exists(temp_path):
                    os.remove(temp_path)
                return (orig_size, orig_size, False)
    except Exception as e:
        temp_path = filepath + '.tmp.webp'
        if os.path.exists(temp_path):
            os.remove(temp_path)
        return (orig_size, orig_size, False)

def main():
    files = [
        os.path.join(FRAMES_DIR, f)
        for f in os.listdir(FRAMES_DIR)
        if f.endswith('.webp')
    ]
    print(f'Starting optimization of {len(files)} frames in {FRAMES_DIR}...')
    
    total_orig = sum(os.path.getsize(f) for f in files)
    compressed_count = 0
    total_saved = 0
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
        results = list(executor.map(process_image, files))
        
    for orig_s, new_s, changed in results:
        if changed:
            compressed_count += 1
            total_saved += (orig_s - new_s)
            
    final_total = sum(os.path.getsize(f) for f in files)
    print('==================================================')
    print(f'Optimization Complete!')
    print(f'Frames optimized: {compressed_count} / {len(files)}')
    print(f'Original size:   {total_orig / (1024*1024):.2f} MB')
    print(f'New total size:  {final_total / (1024*1024):.2f} MB')
    print(f'Total bandwidth saved: {total_saved / (1024*1024):.2f} MB (-{(total_saved/total_orig)*100:.1f}%)')
    print('==================================================')

if __name__ == '__main__':
    main()
