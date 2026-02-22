#!/bin/bash
# Get the directory where this script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Navigate to that directory
cd "$DIR"

# Print message
echo "Starting Zaza Land Portfolio locally..."
echo "You can view the site at: http://localhost:8000"
echo "Press Ctrl+C to stop the server."

# Open the default browser after a brief delay to ensure server is up
(sleep 1 && open "http://localhost:8000") &

# Start the simple HTTP server using Python
python3 -m http.server 8000
