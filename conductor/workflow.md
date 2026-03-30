# Conductor Workflow

## Overview
Standard Conductor workflow for HeadHunterFilter project with Test-Driven Development and iterative development cycles.

## Development Principles

### 1. Test-Driven Development (TDD)
- **Write Tests First**: Before implementing any feature, write failing tests
- **Red-Green-Refactor**: Make test fail → Make it pass → Refactor code
- **Coverage Target**: >80% code coverage required

### 2. Commit Strategy
- **Per-Task Commits**: Commit after each completed task
- **Atomic Commits**: Each commit represents a single logical change
- **Clear Messages**: Conventional Commits format (`feat:`, `fix:`, `chore:`, etc.)

### 3. Code Review
- **Self-Review**: Review your own code before committing
- **Automated Checks**: ESLint, Prettier, TypeScript must pass
- **Build Verification**: `npm run build` must succeed

## Workflow Phases

### Phase 1: Research
1. Read existing codebase and documentation
2. Analyze requirements from spec.md
3. Document findings in `research_*.md`
4. **Output**: Research document with codebase understanding

### Phase 2: Planning
1. Create detailed implementation plan
2. Break down into atomic tasks
3. Define success criteria for each task
4. **Output**: `plan_*.md` with task hierarchy

### Phase 3: Implementation
For each task in plan.md:
1. **Write Tests**: Create test cases first
2. **Implement Code**: Write minimal code to pass tests
3. **Run Tests**: Verify tests pass
4. **Refactor**: Clean up code while keeping tests green
5. **Commit**: Commit changes with clear message

### Phase 4: Verification
1. **Run Full Test Suite**: All tests must pass
2. **Build Project**: `npm run build` must succeed
3. **Manual Testing**: Verify functionality in browser
4. **Code Quality**: ESLint, Prettier checks pass

### Phase 5: Phase Completion (Protocol)
1. **User Manual Verification**: Demo functionality to user
2. **Documentation Update**: Update relevant docs
3. **Git Checkpoint**: Create annotated tag
4. **Status Update**: Mark phase as complete in tracks.md

## Task Status Flow
```
Todo → In Progress → Code Complete → Tests Passing → Done
```

## Branch Strategy
- **Main Branch**: `master` (production-ready)
- **Feature Branches**: `feature/<track_id>-<description>`
- **Hotfix Branches**: `hotfix/<description>`

## Definition of Done (DoD)
- [ ] All tests passing (>80% coverage)
- [ ] Code reviewed and approved
- [ ] ESLint/Prettier checks pass
- [ ] Build succeeds without errors
- [ ] Documentation updated
- [ ] Manual testing completed
- [ ] Git commit with clear message

## Tools & Commands
```bash
# Development
npm start              # Start dev server
npm run build          # Production build
npm test               # Run tests
npm run lint           # ESLint check

# Git
git add .              # Stage changes
git commit -m "type: message"  # Commit with conventional message
git push               # Push to remote
```

## Phase Completion Verification Protocol
At the end of each phase:
1. **Verify all tasks marked [x] in plan.md**
2. **Run `npm run build` - must succeed**
3. **Run `npm test` - all tests must pass**
4. **User demo: Show working functionality**
5. **Create git tag**: `git tag phase-<N>-complete`
6. **Update tracks.md**: Mark phase as complete
