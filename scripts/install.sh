#!/bin/bash

# =============================================================================
# n8n-nodes-modern-treasury Installation Script
# Copyright (c) Velocity BPA, LLC
# =============================================================================

set -e

echo "=============================================="
echo "n8n-nodes-modern-treasury Installation Script"
echo "By Velocity BPA - https://velobpa.com"
echo "=============================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Please install Node.js >= 18.10"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}Error: Node.js version must be >= 18${NC}"
    echo "Current version: $(node -v)"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v) detected${NC}"

# Check for pnpm
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}pnpm not found. Installing...${NC}"
    npm install -g pnpm
fi
echo -e "${GREEN}✓ pnpm $(pnpm -v) detected${NC}"

# Install dependencies
echo ""
echo "Installing dependencies..."
pnpm install

# Build the project
echo ""
echo "Building the project..."
pnpm build

echo ""
echo -e "${GREEN}=============================================="
echo "Installation Complete!"
echo "==============================================${NC}"
echo ""
echo "Next steps:"
echo "1. Link the package to your n8n installation:"
echo "   npm link"
echo ""
echo "2. In your n8n directory, link the package:"
echo "   npm link n8n-nodes-modern-treasury"
echo ""
echo "3. Restart n8n"
echo ""
echo "For more information, see README.md"
