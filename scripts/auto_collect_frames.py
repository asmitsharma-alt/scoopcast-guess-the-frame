"""
Scoopcast Auto-Collector Entry Point.
Runs the high-speed multi-threaded 1080p uncompressed harvester.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from local_fast_farmer import main

if __name__ == "__main__":
    main()
