/**
 * Crane's Theme JavaScript
 * Corner navigation and category label interactions
 */

(function() {
    'use strict';

    // Elements
    const cornerNav = document.querySelector('.corner-nav');
    const categoryLabel = document.querySelector('.letter-category');
    const drawer = document.querySelector('.drawer');
    const overlay = document.querySelector('.drawer-overlay');
    const closeBtn = document.querySelector('.drawer-close');
    const topicsToggle = document.querySelector('[data-topics-toggle]');

    // State
    let lastMouseX = 0;
    let hideTimeout = null;
    let categoryFadeTimeout = null;
    let isMouseOverNav = false;
    const MOUSE_THRESHOLD = 8; // pixels of horizontal movement to trigger
    const NAV_HIDE_DELAY = 2500; // ms before nav hides after stillness
    const CATEGORY_FADE_DELAY = 2000; // ms before category fades on page load

    // -------------------------------------------------------------------------
    // Corner Navigation (Desktop)
    // -------------------------------------------------------------------------

    function showNavigation() {
        if (!cornerNav) return;

        cornerNav.classList.add('is-visible');

        // Also show category label when nav is visible
        if (categoryLabel) {
            categoryLabel.classList.remove('is-hidden');
        }

        // Clear any existing hide timeout
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
    }

    function hideNavigation() {
        if (!cornerNav || isMouseOverNav) return;

        cornerNav.classList.remove('is-visible');

        // Also hide category label when nav hides
        if (categoryLabel) {
            categoryLabel.classList.add('is-hidden');
        }
    }

    function scheduleHide() {
        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }
        hideTimeout = setTimeout(hideNavigation, NAV_HIDE_DELAY);
    }

    // Handle mouse movement - show nav on horizontal movement
    function handleMouseMove(e) {
        // Don't trigger while mouse button is pressed (text selection)
        if (e.buttons !== 0) return;

        const deltaX = Math.abs(e.clientX - lastMouseX);

        if (deltaX >= MOUSE_THRESHOLD) {
            showNavigation();
            scheduleHide();
        }

        lastMouseX = e.clientX;
    }

    // Track mouse entering/leaving the navigation area
    if (cornerNav) {
        cornerNav.addEventListener('mouseenter', function() {
            isMouseOverNav = true;
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }
        });

        cornerNav.addEventListener('mouseleave', function() {
            isMouseOverNav = false;
            scheduleHide();
        });
    }

    // Listen for mouse movement (desktop only)
    if (window.matchMedia('(min-width: 601px)').matches) {
        document.addEventListener('mousemove', handleMouseMove);
    }

    // -------------------------------------------------------------------------
    // Category Label Initial Fade
    // -------------------------------------------------------------------------

    // On page load, fade out category after delay (desktop only)
    if (categoryLabel && window.matchMedia('(min-width: 601px)').matches) {
        categoryFadeTimeout = setTimeout(function() {
            categoryLabel.classList.add('is-hidden');
        }, CATEGORY_FADE_DELAY);
    }

    // -------------------------------------------------------------------------
    // Mobile Drawer (preserved for mobile navigation)
    // -------------------------------------------------------------------------

    if (!drawer) return;

    function openDrawer() {
        drawer.classList.add('is-open');
        drawer.setAttribute('aria-hidden', 'false');
        if (overlay) overlay.classList.add('is-visible');
        document.body.style.overflow = 'hidden';

        // Move focus to close button
        if (closeBtn) closeBtn.focus();
    }

    function closeDrawer() {
        drawer.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
        if (overlay) overlay.classList.remove('is-visible');
        document.body.style.overflow = '';
    }

    function toggleDrawer() {
        if (drawer.classList.contains('is-open')) {
            closeDrawer();
        } else {
            openDrawer();
        }
    }

    // Event listeners for mobile drawer
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

})();
