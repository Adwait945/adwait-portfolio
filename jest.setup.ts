import '@testing-library/jest-dom'

// In production the root <html> carries the dark-theme class (see app/layout.tsx).
// jsdom + RTL render a nested <html> inside the test container rather than
// replacing document.documentElement, so mirror the production root class here
// for tests that assert on document.documentElement.
document.documentElement.classList.add('dark')
