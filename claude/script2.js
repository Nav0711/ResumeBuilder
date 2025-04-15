document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const resumeForm = document.getElementById('resumeForm');
    const addEducationBtn = document.getElementById('addEducation');
    const addExperienceBtn = document.getElementById('addExperience');
    const printResumeBtn = document.getElementById('printResume');
    const educationContainer = document.getElementById('education-container');
    const experienceContainer = document.getElementById('experience-container');
    const resumePreview = document.getElementById('resume-preview');
    
    // Add education entry
    addEducationBtn.addEventListener('click', function() {
        const educationEntry = document.createElement('div');
        educationEntry.className = 'education-entry';
        educationEntry.innerHTML = `
            <div class="input-group">
                <label for="degree">Degree</label>
                <input type="text" class="degree" name="degree">
            </div>
            <div class="input-group">
                <label for="school">School</label>
                <input type="text" class="school" name="school">
            </div>
            <div class="input-group">
                <label for="graduationYear">Graduation Year</label>
                <input type="text" class="graduationYear" name="graduationYear">
            </div>
            <button type="button" class="remove-btn">Remove</button>
        `;
        
        // Add the new entry before the "Add More" button
        educationContainer.insertBefore(educationEntry, addEducationBtn);
        
        // Add event listener to remove button
        const removeBtn = educationEntry.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            educationContainer.removeChild(educationEntry);
        });
    });
    
    // Add experience entry
    addExperienceBtn.addEventListener('click', function() {
        const experienceEntry = document.createElement('div');
        experienceEntry.className = 'experience-entry';
        experienceEntry.innerHTML = `
            <div class="input-group">
                <label for="jobTitle">Job Title</label>
                <input type="text" class="jobTitle" name="jobTitle">
            </div>
            <div class="input-group">
                <label for="company">Company</label>
                <input type="text" class="company" name="company">
            </div>
            <div class="input-group">
                <label for="employmentPeriod">Employment Period</label>
                <input type="text" class="employmentPeriod" name="employmentPeriod" placeholder="e.g. Jan 2020 - Present">
            </div>
            <div class="input-group">
                <label for="jobDescription">Job Description</label>
                <textarea class="jobDescription" name="jobDescription" rows="3"></textarea>
            </div>
            <button type="button" class="remove-btn">Remove</button>
        `;
        
        // Add the new entry before the "Add More" button
        experienceContainer.insertBefore(experienceEntry, addExperienceBtn);
        
        // Add event listener to remove button
        const removeBtn = experienceEntry.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            experienceContainer.removeChild(experienceEntry);
        });
    });
    
    // Handle form submission
    resumeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        generateResume();
    });
    
    // Print resume functionality
    printResumeBtn.addEventListener('click', function() {

        resumePreview.classList.remove('hidden');

        setTimeout(() => {
            window.print();

            resumePreview.classList.add('hidden');
        }, 100);

    });

    
    
    // Generate resume from form data
    function generateResume() {
        // Personal information
        document.getElementById('preview-name').textContent = document.getElementById('fullName').value;
        document.getElementById('preview-email').textContent = document.getElementById('email').value;
        document.getElementById('preview-phone').textContent = document.getElementById('phone').value;
        document.getElementById('preview-location').textContent = document.getElementById('location').value;
        document.getElementById('preview-summary').textContent = document.getElementById('summary').value;
        
        // Education
        const educationEntries = document.querySelectorAll('.education-entry');
        const previewEducation = document.getElementById('preview-education');
        previewEducation.innerHTML = '';
        
        educationEntries.forEach(entry => {
            const degree = entry.querySelector('.degree').value;
            const school = entry.querySelector('.school').value;
            const graduationYear = entry.querySelector('.graduationYear').value;
            
            if (degree || school) {
                const educationItem = document.createElement('div');
                educationItem.className = 'education-item';
                educationItem.innerHTML = `
                    <h3>${degree}${school ? ' - ' + school : ''}</h3>
                    <p>${graduationYear || ''}</p>
                `;
                previewEducation.appendChild(educationItem);
            }
        });
        
        // Experience
        const experienceEntries = document.querySelectorAll('.experience-entry');
        const previewExperience = document.getElementById('preview-experience');
        previewExperience.innerHTML = '';
        
        experienceEntries.forEach(entry => {
            const jobTitle = entry.querySelector('.jobTitle').value;
            const company = entry.querySelector('.company').value;
            const employmentPeriod = entry.querySelector('.employmentPeriod').value;
            const jobDescription = entry.querySelector('.jobDescription').value;
            
            if (jobTitle || company) {
                const experienceItem = document.createElement('div');
                experienceItem.className = 'experience-item';
                experienceItem.innerHTML = `
                    <h3>${jobTitle}${company ? ' at ' + company : ''}</h3>
                    <p class="period">${employmentPeriod || ''}</p>
                    <p>${jobDescription || ''}</p>
                `;
                previewExperience.appendChild(experienceItem);
            }
        });
        
        // Skills
        const skills = document.getElementById('skills').value;
        const previewSkills = document.getElementById('preview-skills');
        previewSkills.innerHTML = '';
        
        if (skills) {
            const skillsList = document.createElement('div');
            skillsList.className = 'skills-list';
            
            const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
            
            skillsArray.forEach(skill => {
                const skillTag = document.createElement('span');
                skillTag.className = 'skill-tag';
                skillTag.textContent = skill;
                skillsList.appendChild(skillTag);
            });
            
            previewSkills.appendChild(skillsList);
        }
        
        // Show resume preview
        resumePreview.classList.remove('hidden');
        
        // Scroll to preview
        resumePreview.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Style the remove buttons
    document.addEventListener('click', function(e) {
        if (e.target && e.target.className === 'remove-btn') {
            e.target.style.backgroundColor = '#e74c3c';
            e.target.style.color = 'white';
            e.target.style.border = 'none';
            e.target.style.padding = '0.5rem 1rem';
            e.target.style.borderRadius = '4px';
            e.target.style.cursor = 'pointer';
            e.target.style.marginTop = '0.5rem';
        }
    });
});