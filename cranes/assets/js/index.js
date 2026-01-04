/**
 * Crane's Theme JavaScript
 * Minimal interactions for drawer navigation
 */

(function() {
    'use strict';

    // Elements
    const seal = document.querySelector('.seal');
    const drawer = document.querySelector('.drawer');
    const overlay = document.querySelector('.drawer-overlay');
    const closeBtn = document.querySelector('.drawer-close');
    const topicsToggle = document.querySelector('[data-topics-toggle]');

    if (!drawer) return;

    // Open drawer
    function openDrawer() {
        drawer.classList.add('is-open');
        drawer.setAttribute('aria-hidden', 'false');
        overlay.classList.add('is-visible');
        if (seal) seal.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';

        // Move focus to close button
        if (closeBtn) closeBtn.focus();
    }

    // Close drawer
    function closeDrawer() {
        drawer.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
        overlay.classList.remove('is-visible');
        if (seal) seal.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';

        // Return focus to seal button
        if (seal) seal.focus();
    }

    // Toggle drawer
    function toggleDrawer() {
        if (drawer.classList.contains('is-open')) {
            closeDrawer();
        } else {
            openDrawer();
        }
    }

    // Event listeners
    if (seal) {
        seal.addEventListener('click', toggleDrawer);
    }

    if (topicsToggle) {
        topicsToggle.addEventListener('click', toggleDrawer);
    }

    if (overlay) {
        overlay.addEventListener('click', closeDrawer);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeDrawer);
    }

    // Close on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
            closeDrawer();
        }
    });

    // Ghost's Portal script handles form states automatically via
    // [data-members-success] and [data-members-error] attributes

})();
