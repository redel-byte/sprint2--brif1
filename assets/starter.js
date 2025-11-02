/**
 * Job Listings Application - Starter Code
 * 
 * This is a starter template for building a complete job listings management application.
 * You need to implement the functionality for each function marked with TODO.
 * 
 * Features to implement:
 * - Load and display job listings from data.json
 * - Search and filter functionality
 * - Tab navigation (Profile, Favorites, Manage)
 * - CRUD operations for job management
 * - Favorites system with localStorage
 * - Form validation
 * - Modal dialogs
 * - User profile management
 */

document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------
    // --- GLOBAL VARIABLES ---
    // ------------------------------------

    /** @type {Array} All job listings loaded from data.json */
    let allJobs = [];

    /** @type {Array} Currently active manual filters */
    let manualFilters = [];

    /** @type {Object} User profile data */
    let userProfile = { name: '', position: '', skills: [] };

    /** @type {Array} Array of favorite job IDs */
    let favoriteJobIds = [];

    // LocalStorage keys
    const PROFILE_STORAGE_KEY = 'jobAppUserProfile';
    const FAVORITES_STORAGE_KEY = 'jobAppFavorites';
    const ALL_JOBS_KEY = 'jobAppAllJobs';

    // DOM Elements - Main containers
    const jobListingsContainer = document.getElementById('job-listings-container');
    const filterTagsContainer = document.getElementById('filter-tags-container');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const searchInput = document.getElementById('search-input');
    const statsCounter = document.getElementById('stats-counter');
    const filterBar = document.getElementById('filter-bar');

    // DOM Elements - Profile
    const profileForm = document.getElementById('profile-form');
    const profileNameInput = document.getElementById('profile-name');
    const profilePositionInput = document.getElementById('profile-position');
    const skillInput = document.getElementById('skill-input');
    const profileSkillsList = document.getElementById('profile-skills-list');

    // DOM Elements - Tabs
    const tabsNav = document.querySelector('.tabs-nav');
    const tabContents = document.querySelectorAll('.tab-content');

    // DOM Elements - Favorites
    const favoriteJobsContainer = document.getElementById('favorite-jobs-container');
    const favoritesCount = document.getElementById('favorites-count');

    // DOM Elements - Job Management
    const manageJobsList = document.getElementById('manage-jobs-list');
    const addNewJobBtn = document.getElementById('add-new-job-btn');

    // DOM Elements - View Modal
    const viewModal = document.getElementById('job-modal');
    const viewModalCloseBtn = document.getElementById('modal-close-btn-view');

    // DOM Elements - Manage Modal
    const manageModal = document.getElementById('manage-job-modal');
    const manageModalCloseBtn = document.getElementById('modal-close-btn-manage');
    const manageModalTitle = document.getElementById('manage-modal-title');
    const manageJobForm = document.getElementById('manage-job-form');

    // DOM Elements - Manage Form Fields
    const jobIdInput = document.getElementById('job-id-input');
    const jobCompanyInput = document.getElementById('job-company');
    const jobPositionInput = document.getElementById('job-position');
    const jobLogoInput = document.getElementById('job-logo');
    const jobContractInput = document.getElementById('job-contract');
    const jobLocationInput = document.getElementById('job-location');
    const jobRoleInput = document.getElementById('job-role');
    const jobLevelInput = document.getElementById('job-level');
    const jobSkillsInput = document.getElementById('job-skills');
    const jobDescriptionInput = document.getElementById('job-description');

    // ------------------------------------
    // --- DATA MANAGEMENT ---
    // ------------------------------------

    /**
     * Loads job listings from data.json file
     * If localStorage has saved jobs, use those instead for persistence
     * @async
     * @function loadAllJobs
     * @returns {Promise<void>}
     */
    const loadAllJobs = async () => {
        // TODO: Implement data loading logic
        // 1. Check if jobs exist in localStorage
        // 2. If not, fetch from data.json
        // 3. Save to localStorage for persistence
        // 4. Handle errors appropriately

        try {
            const response = await fetch('./assets/data/data.json');
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            allJobs = await response.json();
            saveAllJobs();
        } catch (error) {
            console.error("Error loading data.json:", error);
            jobListingsContainer.innerHTML = '<p class="job-listings__empty">Error loading job data.</p>';
        }
    };

    /**
     * Saves all jobs to localStorage
     * @function saveAllJobs
     */
    const saveAllJobs = () => {
        // TODO: Implement localStorage save functionality
    };

    // ------------------------------------
    // --- FORM VALIDATION ---
    // ------------------------------------

    const showError = (input, message) => {
        if (!input) return;
        input.classList.add('input--error');
        let err = input.parentElement.querySelector('.error-message');
            err = document.createElement('span');
            err.className = 'error-message';
            input.parentElement.appendChild(err);
        err.textContent = message;
    };

    const clearErrors = (form) => {
        if (!form) return;
        form.querySelectorAll('.input--error').forEach(el => el.classList.remove('input--error'));
        form.querySelectorAll('.error-message').forEach(el => el.remove());
    };
     
    const validateProfileForm = () => {
        clearErrors(profileForm);
        let valid = true;
        const name = profileNameInput.value.trim();
        const position = profilePositionInput.value.trim();

        if (!name) {
            showError(profileNameInput, '[!] Profile name is required.');
            valid = false;
        }
        if (!position) {
            showError(profilePositionInput, 'profile position is required.');
            valid = false;
        }
        return valid;
    };

    const validateJobForm = () => {
        clearErrors(manageJobForm);
        let valid = true;

        const company = jobCompanyInput.value.trim();
        const position = jobPositionInput.value.trim();
        const contract = jobContractInput.value.trim();
        const location = jobLocationInput.value.trim();
        const description = jobDescriptionInput.value.trim();
        const logo = jobLogoInput.value.trim();

        if (!company) {
            showError(jobCompanyInput, '[!] company is required.');
            valid = false;
        }
        if (!position) {
            showError(jobPositionInput, '[!] position is required.');
            valid = false;
        }
        if (!contract) {
            showError(jobContractInput, '[!] contract is required.');
            valid = false;
        }
        if (!location) {
            showError(jobLocationInput, '[!] location is required');
            valid = false;
        }
        if (!description) {
            showError(jobDescriptionInput, '[!] description is reqruired.');
            valid = false;
        }

        return valid;
    };

    // ------------------------------------
    // --- PROFILE MANAGEMENT ---
    // ------------------------------------

    /**
     * Saves user profile to localStorage
     * @function saveProfile
     */
    const saveProfile = () => {
        // TODO: Implement profile saving
    };

    /**
     * Loads user profile from localStorage
     * @function loadProfile
     */
    const loadProfile = () => {
        // TODO: Implement profile loading
    };

    /**
     * Renders profile skills list
     * @function renderProfileSkills
     */

    const renderProfileSkills = () => {

        const profileForm = document.getElementById('profile-form');
        const profileNameInput = document.getElementById('profile-name');
        const profilePositionInput = document.getElementById('profile-position');
        const skillInput = document.getElementById('skill-input');
        const profileSkillsList = document.getElementById('profile-skills-list');

        // TODO: Implement skills rendering
        const profile_search_btn = document.querySelector('.profile-form__save-btn');
        profile_search_btn.addEventListener('click', function (e) {
            const post_recherche = profilePositionInput.value;
            const competence_recherche = skillInput.value;
            e.preventDefault();
            const search_resutl2 = [];
            let job_found2 = 0;
            const search_skills = (skill) => {
                for (let index = 0; index < skill.length; index++) {
                    if (skill[index].toLowerCase().includes(competence_recherche)) {
                        return true
                    }
                }
                return false
            }

            for (let index = 0; index < allJobs.length; index++) {
                if (
                    allJobs[index].position.toLowerCase().includes(post_recherche.toLowerCase()) ||
                    search_skills(allJobs[index].skills)

                ) {
                    job_found2++;
                    search_resutl2.push(allJobs[index])
                }


            }


            statsCounter.firstElementChild.textContent = job_found2 + ` offer trouve aux ` + allJobs.length
            // statsCounter..textContent = job_found + `offer trouve aux` + allJobs.length

            renderJobs(search_resutl2);
            const user_profile_input = skillInput.value;
            // for (let i = 0; i < allJobs.length; i++) {
            //     for (let j = 0; j < allJobs[i].skills.length; j++) {
            //         if (allJobs[i].skills[j].toLowerCase() === user_profile_input) {


            //         }
            if (user_profile_input != "") {
                profileSkillsList.innerHTML += `<li class="profile-skill-tag" data-skill="${user_profile_input}">
                                                       <span>${user_profile_input}</span>
                                                       <button class="profile-skill-remove" aria-label="Remove skill ${user_profile_input}">✕</button>
                                                       </li>`;
            }
            renderJobs(allJobs[i]);
        })
        // Use this HTML template for each skill:

    };

    /**
     * Renders profile form with saved data
     * @function renderProfileForm
     */
    const renderProfileForm = () => {
        // TODO: Populate form fields with saved profile data
    };

    /**
     * Handles profile form submission
     * @function handleProfileSave
     * @param {Event} e - Form submit event
     */
    const handleProfileSave = (e) => {
        // TODO: Implement profile save logic
        // 1. Prevent default form submission
        // 2. Validate form
        // 3. Save profile data
        // 4. Update filters if needed
    };

    /**
     * Handles adding new skills
     * @function handleSkillAdd
     * @param {KeyboardEvent} e - Keydown event
     */
    const handleSkillAdd = (e) => {
        // TODO: Implement skill addition on Enter key
        // 1. Check if Enter key was pressed
        // 2. Get skill value
        // 3. Add to profile if not duplicate
        // 4. Re-render skills and apply filters
    };

    /**
     * Handles removing skills
     * @function handleSkillRemove
     * @param {Event} e - Click event
     */
    const handleSkillRemove = (e) => {
        // TODO: Implement skill removal
        const ul = document.getElementById("profile-skills-list");
        ul.addEventListener("click", function (event) {
            // if (event.target.classList.contains("profile-skill-remove")) {
            const li = event.target.closest("li");
            li.remove(); // Remove the clicked li
            // }
        });
        // 1. Find clicked remove button
        // 2. Get skill name
        // 3. Remove from profile
        // 4. Re-render and apply filters
    };
    handleSkillRemove();

    // --- FAVORITES MANAGEMENT ---
    // ------------------------------------

    /**
     * Saves favorites to localStorage
     * @function saveFavorites
     */
    const saveFavorites = () => {
        // TODO: Implement favorites saving
    };

    /**
     * Loads favorites from localStorage
     * @function loadFavorites
     */
    const loadFavorites = () => {
        // TODO: Implement favorites loading
    };

    /**
     * Updates favorites count display
     * @function renderFavoritesCount
     */
    const renderFavoritesCount = () => {
        // TODO: Update favorites count in tab
        favoritesCount.innerText = `(${favoriteJobIds.length})`;
    };

    /**
     * Renders favorite jobs in favorites tab
     * @function renderFavoriteJobs
     */
    const renderFavoriteJobs = () => {
        // TODO: Implement favorites rendering
        // 1. Filter jobs by favorite IDs
        // 2. Use createJobCardHTML for each job
        // 3. Show empty message if no favorites

        let contentHtml = "";
        if (favoriteJobIds.length === 0) {
            favoriteJobsContainer.innerHTML = '<p class="job-listings__empty">No jobs favorite found.</p>';
        } else {
            for (let i = 0; i < favoriteJobIds.length; i++) {
                const objectJob = allJobs.find((item) => item.id === favoriteJobIds[i]);
                if (objectJob) {
                    contentHtml += createJobCardHTML(objectJob);
                }
            }

            favoriteJobsContainer.innerHTML = contentHtml;
        }
    };

    /**
     * Toggles job favorite status
     * @function toggleFavorite
     * @param {number} jobId - Job ID to toggle
     */
    const toggleFavorite = (jobId) => {
        // TODO: Implement favorite toggle
        // 1. Check if job is already favorite
        // 2. Add or remove from favorites array
        // 3. Save to localStorage
        // 4. Update UI

        // search
        const indexOfJob = favoriteJobIds.indexOf(jobId);

        // find job
        if (indexOfJob !== -1) {
            // Remove job
            favoriteJobIds.splice(indexOfJob, 1);
        } else {
            // Add job
            favoriteJobIds.push(jobId);
        }

        renderJobs(allJobs);
        renderFavoritesCount();
        renderFavoriteJobs();
    };

    // ------------------------------------
    // --- TAB NAVIGATION ---
    // ------------------------------------

    /**
     * Sets up tab navigation functionality
     * @function setupTabs
     */
    const setupTabs = () => {
        tabsNav.addEventListener('click', (e) => {
            const clickedTab = e.target.closest('.tab-item');
            if (!clickedTab) return;

            // Update active tab
            tabsNav.querySelectorAll('.tab-item').forEach(tab => tab.classList.remove('tab-item--active'));
            clickedTab.classList.add('tab-item--active');

            // Show/hide tab content
            const tabId = clickedTab.dataset.tab;
            tabContents.forEach(content => {
                content.classList.toggle('tab-content--active', content.id === `tab-${tabId}`);
            });

            // Load tab-specific content
            if (tabId === 'favorites') renderFavoriteJobs();
            if (tabId === 'manage') renderManageList();
        });
    };

    // ------------------------------------
    // --- MODAL MANAGEMENT ---
    // ------------------------------------

    /**
     * Opens job details modal
     * @function openViewModal
     * @param {number} jobId - Job ID to display
     */
    const openViewModal = (jobId) => {
        const job = allJobs.find(j => j.id === jobId);
        if (job) {
            document.getElementById('modal-logo').src = job.logo || `https://api.dicebear.com/8.x/initials/svg?seed=${job.company}`;
            document.getElementById('modal-position').textContent = job.position;
            document.getElementById('modal-company').textContent = job.company;
            document.getElementById('modal-description').textContent = job.description;
            document.getElementById('modal-meta').innerHTML = `<li>${job.postedAt}</li><li>${job.contract}</li><li>${job.location}</li>`;
            const tags = [job.role, job.level, ...(job.skills || [])];
            document.getElementById('modal-tags').innerHTML = tags.map(tag => `<span class="job-card__tag">${tag}</span>`).join('');
            viewModal.style.display = 'flex';
        }
    };

    /**
     * Closes job details modal
     * @function closeViewModal
     */
    const closeViewModal = () => {
        viewModal.style.display = 'none';
    };

    /**
     * Opens job management modal (add/edit)
     * @function openManageModal
     * @param {number|null} jobId - Job ID to edit, null for new job
     */
    const openManageModal = (jobId = null) => {
        clearErrors(manageJobForm);
        if (jobId) {
            // Edit mode
            const job = allJobs.find(j => j.id === jobId);
            if (!job) return;
            manageModalTitle.textContent = 'Edit Job';
            jobIdInput.value = job.id;
            jobCompanyInput.value = job.company;
            jobPositionInput.value = job.position;
            jobLogoInput.value = job.logo || '';
            jobContractInput.value = job.contract;
            jobLocationInput.value = job.location;
            jobRoleInput.value = job.role;
            jobLevelInput.value = job.level;
            jobSkillsInput.value = (job.skills || []).join(', ');
            jobDescriptionInput.value = job.description;
        } else {
            // Add mode
            manageModalTitle.textContent = 'Add New Job';
            manageJobForm.reset();
            jobIdInput.value = '';
        }
        manageModal.style.display = 'flex';
    };

    /**
     * Closes job management modal
     * @function closeManageModal
     */
    const closeManageModal = () => {
        manageModal.style.display = 'none';
    };

    // ------------------------------------
    // --- JOB MANAGEMENT (CRUD) ---
    // ------------------------------------

    /**
     * Renders job management list
     * @function renderManageList
     */
    const renderManageList = () => {
        // TODO: Implement manage list rendering
        // Use this HTML template for each job:
        // `<li class="manage-job-item" data-job-id="${job.id}">
        //     <img src="${job.logo}" alt="" class="job-card__logo" style="position: static; width: 48px; height: 48px; border-radius: 5px;">
        //     <div class="manage-job-item__info">
        //         <h4>${job.position}</h4>
        //         <p>${job.company} - ${job.location}</p>
        //     </div>
        //     <div class="manage-job-item__actions">
        //         <button class="btn btn--secondary btn-edit">Edit</button>
        //         <button class="btn btn--danger btn-delete">Delete</button>
        //     </div>
        //  </li>`
    };
    /**
     * Handles job form submission (add/edit)
     * @function handleManageFormSubmit
     * @param {Event} e - Form submit event
     */
    const handleManageFormSubmit = () => {
        // TODO: Implement job save logic
        // const jobIdInput = document.getElementById('job-id-input');
        // const jobCompanyInput = document.getElementById('job-company');
        // const jobPositionInput = document.getElementById('job-position');
        // const jobLogoInput = document.getElementById('job-logo');
        // const jobContractInput = document.getElementById('job-contract');
        // const jobLocationInput = document.getElementById('job-location');
        // const jobRoleInput = document.getElementById('job-role');
        // const jobLevelInput = document.getElementById('job-level');
        // const jobSkillsInput = document.getElementById('job-skills');
        // const jobDescriptionInput = document.getElementById('job-description');



        const ajt_btn = document.getElementById('save-job-btn')


        // Clear all previous errors

        ajt_btn.addEventListener('click', (e) => {
            let hasError = false;
            e.preventDefault();



            const error = document.querySelectorAll('.form-error');
            error.forEach(err => {
                if (jobCompanyInput.value.trim() === "") {
                    err.innerHTML = "Champ obligatoire.";
                    hasError = true;
                }

                if (jobPositionInput.value.trim() === "") {
                    err.textContent = "Champ obligatoire.";
                    hasError = true;

                }
                if (jobLogoInput.value.trim() !== "" && !jobLogoInput.value.startsWith("http")) {
                    err.textContent = "URL invalide.";
                    hasError = true;
                }

                if (jobContractInput.value.trim() === "") {
                    err.textContent = "Champ obligatoire.";
                    hasError = true;
                }

                if (jobLocationInput.value.trim() === "") {
                    err.textContent = "Champ obligatoire.";
                    hasError = true;
                }

                if (jobRoleInput.value.trim() === "") {
                    err.textContent = "Champ obligatoire.";
                    hasError = true;
                }

                if (jobLevelInput.value.trim() === "") {
                    err.textContent = "Champ obligatoire.";
                    hasError = true;
                }

                if (jobSkillsInput.value.trim() === "") {
                    err.textContent = "Champ obligatoire.";
                    hasError = true;
                }

                if (jobDescriptionInput.value.trim() === "") {
                    err.textContent = "Champ obligatoire.";
                    hasError = true;
                }

            }); if (!hasError) {
                manageJobsList.innerHTML += `<li class="manage-job-item" data-job-id=>
            <img src="" alt="" class="job-card__logo" style="position: static; width: 48px; height: 48px; border-radius: 5px;">
            <div class="manage-job-item__info">
                <h4>alisibrahim</h4>
                <p>asfdasdfasdf</p>
            </div>
            <div class="manage-job-item__actions">
                <button class="btn btn--secondary btn-edit">Edit</button>
                <button class="btn btn--danger btn-delete">Delete</button>
            </div>
         </li>`

            } // clear all errors
            error.style.color = "red";
            // Validate required fields


            // Optional: validate logo URL
        });

    };
    handleManageFormSubmit();

    /**
     * Handles manage list clicks (edit/delete)
     * @function handleManageListClick
     * @param {Event} e - Click event
     */
    const handleManageListClick = (e) => {
        // TODO: Implement edit/delete functionality
        // 1. Determine if edit or delete button clicked
        // 2. Get job ID
        // 3. For edit: open manage modal with job data
        // 4. For delete: confirm and remove job
    };

    // ------------------------------------
    // --- JOB RENDERING ---
    // ------------------------------------

    /**
     * Creates HTML for a single job card
     * @function createJobCardHTML
     * @param {Object} job - Job object
     * @returns {string} HTML string for job card
     */
    const createJobCardHTML = (job) => {
        const { id, company, logo, new: isNew, featured, position, role, level, postedAt, contract, location, skills } = job;
        const tags = [role, level, ...(skills || [])];
        const tagsHTML = tags.map(tag => `<span class="job-card__tag" data-tag="${tag}">${tag}</span>`).join('');
        const newBadge = isNew ? '<span class="job-card__badge job-card__badge--new">NEW!</span>' : '';
        const featuredBadge = featured ? '<span class="job-card__badge job-card__badge--featured">FEATURED</span>' : '';
        const featuredClass = featured ? 'job-card--featured' : '';

        const isFavorite = favoriteJobIds.includes(id);
        const favoriteClass = isFavorite ? 'job-card__favorite-btn--active' : '';
        const favoriteIcon = isFavorite ? '★' : '☆';

        return `
            <article class="job-card ${featuredClass}" data-job-id="${id}" data-tags="${tags.join(',')}">
                <button class="job-card__favorite-btn ${favoriteClass}" data-job-id="${id}" aria-label="Add to favorites">
                    ${favoriteIcon}
                </button>
                <img src="${logo || `https://api.dicebear.com/8.x/initials/svg?seed=${company}`}" alt="${company} logo" class="job-card__logo">
                <div class="job-card__info">
                    <div class="job-card__company"><span>${company}</span>${newBadge}${featuredBadge}</div>
                    <h2 class="job-card__position">${position}</h2>
                    <ul class="job-card__meta"><li>${postedAt}</li><li>${contract}</li><li>${location}</li></ul>
                </div>
                <div class="job-card__tags">${tagsHTML}</div>
            </article>
        `;
    };

    /**
     * Renders filtered jobs to main container
     * @function renderJobs
     * @param {Array} jobsToRender - Array of job objects to display
     */
    const renderJobs = (jobsToRender) => {
        jobListingsContainer.innerHTML = jobsToRender.length > 0
            ? jobsToRender.map(createJobCardHTML).join('')
            : '<p class="job-listings__empty">No jobs match your search.</p>';

        const btnFavorites = document.getElementsByClassName("job-card__favorite-btn");

        for (let i = 0; i < btnFavorites.length; i++) {
            btnFavorites[i].addEventListener('click', (e) => {
                const idJob = Number(e.target.getAttribute("data-job-id"));
                toggleFavorite(idJob);
            })
        }
    };

    // ------------------------------------
    // --- FILTERING & SEARCH ---
    // ------------------------------------

    /**
     * Applies all active filters and updates display
     * @function applyAllFilters
     */
    const applyAllFilters = () => {
        // TODO: Implement comprehensive filtering
        // 1. Get search term
             let count;
        searchInput.addEventListener("input", (e) => {
            const valueInput = e.target.value.toLowerCase();
            const arr1 = [];
            for (oneJobs of allJobs) {
                if (oneJobs.company.toLowerCase().includes(valueInput) || oneJobs.position.toLowerCase().includes(valueInput) || oneJobs.skills.find((elem) => elem.toLowerCase().includes(valueInput))) {
                    count = arr1.length+1;
                    arr1.push(oneJobs);
                }
            }
            renderJobs(arr1)
            document.querySelector(".stats-counter").innerHTML = `${count} offers trouvees sur ${allJobs.length}.`;
        })
        // 3. Filter jobs by tags and search term

        // 2. Combine profile skills and manual filters
        // 4. Update all UI components
    };

    // ------------------------------------
    // --- EVENT HANDLERS ---
    // ------------------------------------

    /**
     * Handles clicks on job listings
     * @function handleJobListClick
     * @param {Event} e - Click event
     */
    const handleJobListClick = (e) => {
        // TODO: Implement job list click handling
        // 1. Handle tag clicks (add to filters)
        // 2. Handle favorite button clicks
        // 3. Handle card clicks (open modal)
    };

    /**
     * Handles filter bar clicks
     * @function handleFilterBarClick
     * @param {Event} e - Click event
     */
    const handleFilterBarClick = (e) => {
        // TODO: Implement filter removal
        clearFiltersBtn.addEventListener('click', () => {
            searchInput.value = "";
            renderJobs(allJobs);
        });
        // Handle clicks on filter tag remove buttons
    };
    handleFilterBarClick();

    /**
     * Clears all manual filters
     * @function handleClearFilters
     */
    const handleClearFilters = () => {
        // TODO: Implement filter clearing
        // 1. Clear manual filters array
        // 2. Clear search input
        // 3. Apply filters
    };

    // ------------------------------------
    // --- INITIALIZATION ---
    // ------------------------------------

    /**
     * Initializes the application
     * @async
     * @function initializeApp
     */
    const initializeApp = async () => {
        // TODO: Implement app initialization
        // 1. Load saved data (profile, favorites)
        // 2. Load job data 
        // 3. Render initial UI
        // 4. Set up event listeners
        // 5. Apply initial filters

        // Load data
        loadProfile();
        loadFavorites();
        await loadAllJobs();

        // Render initial UI
        renderProfileForm();
        renderProfileSkills();
        renderFavoritesCount();
        setupTabs();
        applyAllFilters();

        // Modal events
        viewModalCloseBtn.addEventListener('click', closeViewModal);
        viewModal.addEventListener('click', (e) => { if (e.target === viewModal) closeViewModal(); });
        manageModalCloseBtn.addEventListener('click', closeManageModal);
        manageModal.addEventListener('click', (e) => { if (e.target === manageModal) closeManageModal(); });

        // Management events
        addNewJobBtn.addEventListener('click', () => openManageModal());

        // Initial job display
        renderJobs(allJobs);

        // TODO: Add remaining event listeners
        // Profile events
        // Filter events  
        // Job list events
    };

    // Start the application
    initializeApp();
});


