.PHONY: help install lint lint-fix format format-check typecheck test test-ci build export deploy clean audit dev

# Default target - show help
help:
	@echo "MEL4dogs - Development Makefile"
	@echo ""
	@echo "Available targets:"
	@echo "  make install       - Install all dependencies (deterministic with package-lock.json)"
	@echo "  make lint          - Run ESLint to check code quality"
	@echo "  make lint-fix      - Run ESLint with --fix to auto-fix issues"
	@echo "  make format        - Format code with Prettier"
	@echo "  make format-check  - Check code formatting without making changes"
	@echo "  make typecheck     - Run TypeScript type checking (no compilation)"
	@echo "  make test          - Run test suite (placeholder - no tests configured yet)"
	@echo "  make test-ci       - Run tests in CI mode with coverage"
	@echo "  make build         - Build production-ready Next.js application"
	@echo "  make export        - Build and export static HTML (if applicable)"
	@echo "  make deploy        - Deploy to production (requires build first)"
	@echo "  make clean         - Remove build artifacts and caches"
	@echo "  make audit         - Run security audit on dependencies"
	@echo "  make dev           - Start development server with Turbopack"
	@echo ""

# Install dependencies (deterministic)
# Uses npm ci for clean install from package-lock.json
install:
	@echo "📦 Installing dependencies..."
	npm ci
	@echo "✅ Dependencies installed"

# Run linter
# Fails fast on any linting errors
lint:
	@echo "🔍 Running ESLint..."
	npm run lint
	@echo "✅ Linting passed"

# Run linter with auto-fix
lint-fix:
	@echo "🔧 Running ESLint with --fix..."
	npm run lint:fix
	@echo "✅ Linting and auto-fix completed"

# Format code with Prettier
format:
	@echo "✨ Formatting code with Prettier..."
	npm run format
	@echo "✅ Code formatted"

# Check code formatting
format-check:
	@echo "🔎 Checking code formatting..."
	npm run format:check
	@echo "✅ Code formatting is correct"

# Type checking (deterministic, no side effects)
# Runs TypeScript compiler in noEmit mode
typecheck:
	@echo "🔬 Running TypeScript type checking..."
	npm run type-check
	@echo "✅ Type checking passed"

# Run tests
# Currently placeholder - will run actual tests when configured
test:
	@echo "🧪 Running tests..."
	@if [ -f "jest.config.js" ] || [ -f "vitest.config.ts" ]; then \
		npm test; \
	else \
		echo "⚠️  No test framework configured yet"; \
		echo "Consider adding Jest or Vitest for testing"; \
		exit 0; \
	fi

# Run tests in CI mode
# Runs with coverage, non-interactive, and fails fast
test-ci:
	@echo "🧪 Running tests in CI mode..."
	@if [ -f "jest.config.js" ] || [ -f "vitest.config.ts" ]; then \
		npm test -- --ci --coverage --maxWorkers=2; \
	else \
		echo "⚠️  No test framework configured yet"; \
		echo "Skipping tests in CI mode"; \
		exit 0; \
	fi

# Build production application
# Deterministic build with Next.js optimizations
build:
	@echo "🏗️  Building production application..."
	npm run build
	@echo "✅ Build completed"

# Export static HTML (if using static export)
# For static hosting (Netlify, Vercel, S3, etc.)
export: build
	@echo "📤 Exporting static HTML..."
	@if grep -q '"output": "export"' next.config.js next.config.ts next.config.mjs 2>/dev/null; then \
		echo "Static export configured"; \
	else \
		echo "⚠️  Static export not configured in next.config"; \
		echo "Add 'output: \"export\"' to next.config if needed"; \
	fi
	@echo "✅ Export completed (if configured)"

# Deploy to production
# Requires successful build first
deploy: build
	@echo "🚀 Deploying to production..."
	@if [ -f "vercel.json" ]; then \
		echo "Deploying to Vercel..."; \
		npx vercel --prod; \
	elif [ -f "netlify.toml" ]; then \
		echo "Deploying to Netlify..."; \
		npx netlify deploy --prod; \
	else \
		echo "⚠️  No deployment configuration found"; \
		echo "Add vercel.json or netlify.toml for automated deployment"; \
		echo "Or configure your preferred deployment method"; \
		exit 1; \
	fi
	@echo "✅ Deployment completed"

# Clean build artifacts and caches
# Removes all generated files for fresh build
clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf .next
	rm -rf out
	rm -rf node_modules/.cache
	rm -rf .turbopack
	@echo "✅ Clean completed"

# Security audit
# Checks for known vulnerabilities in dependencies
audit:
	@echo "🔒 Running security audit..."
	npm audit --audit-level=moderate
	@echo "✅ Security audit completed"

# Development server (bonus target)
dev:
	@echo "🚀 Starting development server with Turbopack..."
	npm run dev

# CI pipeline target - runs all checks
# Fails fast on first error
ci: install format-check lint typecheck test-ci build
	@echo "✅ All CI checks passed"

# Pre-commit checks - run before committing
# Lighter than full CI, faster feedback
pre-commit: format-check lint typecheck
	@echo "✅ Pre-commit checks passed"
