#!/bin/bash

# Production Deployment Script
# Quick deployment to Vercel with pre-flight checks

set -e  # Exit on error

echo "🚀 MELLI Dogs - Production Deployment"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if in project directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Not in project directory${NC}"
    exit 1
fi

echo "📋 Pre-flight checks..."
echo ""

# 1. TypeScript check
echo -n "  ⏳ TypeScript check... "
if npm run type-check > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo -e "${RED}Fix TypeScript errors before deploying${NC}"
    npm run type-check
    exit 1
fi

# 2. Build check
echo -n "  ⏳ Production build... "
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo -e "${RED}Build failed. Check errors above.${NC}"
    exit 1
fi

# 3. Lint check (if configured)
if grep -q "\"lint\"" package.json; then
    echo -n "  ⏳ Lint check... "
    if npm run lint > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${YELLOW}⚠ Lint warnings (continuing)${NC}"
    fi
fi

echo ""
echo -e "${GREEN}✅ All checks passed!${NC}"
echo ""

# Ask for confirmation
echo "🎯 Ready to deploy to production"
echo "   Domain: mellidogs.pl"
echo "   Platform: Vercel"
echo ""
read -p "Continue with deployment? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 0
fi

echo ""
echo "📦 Deploying to Vercel..."
echo ""

# Deploy to production
if command -v vercel &> /dev/null; then
    vercel --prod
else
    echo -e "${RED}❌ Vercel CLI not installed${NC}"
    echo "Install with: npm i -g vercel"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "🔍 Post-deployment checks:"
echo "  1. Visit https://mellidogs.pl"
echo "  2. Test contact form"
echo "  3. Check Google Analytics (if configured)"
echo "  4. Monitor Vercel deployment logs"
echo ""
echo "📚 See PRODUCTION_CHECKLIST.md for full QA checklist"
echo ""
