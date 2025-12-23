#!/bin/bash

# =============================================================================
# n8n-nodes-modern-treasury Test Script
# Copyright (c) Velocity BPA, LLC
# =============================================================================

set -e

echo "=============================================="
echo "n8n-nodes-modern-treasury Test Runner"
echo "By Velocity BPA - https://velobpa.com"
echo "=============================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Run TypeScript compilation check
echo "Running TypeScript compilation check..."
if pnpm exec tsc --noEmit; then
    echo -e "${GREEN}✓ TypeScript compilation successful${NC}"
else
    echo -e "${RED}✗ TypeScript compilation failed${NC}"
    exit 1
fi

echo ""

# Run tests
echo "Running unit tests..."
if pnpm test; then
    echo -e "${GREEN}✓ All tests passed${NC}"
else
    echo -e "${RED}✗ Tests failed${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}=============================================="
echo "All checks passed!"
echo "==============================================${NC}"
