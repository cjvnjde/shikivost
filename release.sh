#!/bin/bash

# Function to rename the extension zip file with a given prefix
rename_extension() {
    if [ -z "$1" ]; then
        echo "Error: Please provide a prefix (e.g., firefox or chrome)"
        return 1
    fi

    local prefix="$1"
    local source_files=(dist/shikivost*.zip)

    if [ ${#source_files[@]} -eq 0 ]; then
        echo "No file matching 'dist/shikivost*.zip' found"
        return 1
    elif [ ${#source_files[@]} -gt 1 ]; then
        echo "Error: Multiple files matching 'dist/shikivost*.zip'"
        return 1
    fi

    local source_file="${source_files[0]}"
    local filename=$(basename "$source_file")
    local version=${filename#shikivost}
    version=${version%.zip}
    local new_file="dist/${prefix}-shikivost${version}.zip"

    if mv "$source_file" "$new_file"; then
        echo "Renamed '$source_file' to '$new_file'"
    else
        echo "Failed to rename '$source_file' to '$new_file'"
        return 1
    fi
}

pnpm install

if pnpm run build:firefox && pnpm run bundle; then
    rename_extension "firefox"
else
    echo "Firefox build failed"
fi

if pnpm run build:chrome && pnpm run bundle; then
    rename_extension "chrome"
else
    echo "Chrome build failed"
fi
