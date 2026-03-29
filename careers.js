// =============================================
//  GUARDEM SECURITY — CAREERS PAGE JS (INDEED STYLE)
// =============================================

const jobs = [
  {
    id: 1,
    title: "Mobile Supervisor",
    company: "Guardem Security Inc.",
    location: "Greater Vancouver, BC",
    pay: "$24–$28 an hour",
    type: "Full-time",
    shift: "8 hour shift",
    urgent: true,
    description: `
      <p>We are actively seeking an experienced Mobile Supervisor to lead our patrol team across the Greater Vancouver area.</p>
      <br/>
      <p><strong>Responsibilities:</strong></p>
      <ul>
        <li>Supervise and dispatch mobile patrol units</li>
        <li>Conduct site inspections and ensure post orders are followed</li>
        <li>Respond to elevated alarms and incidents</li>
        <li>Train and mentor new security officers</li>
      </ul>
      <p><strong>Requirements:</strong></p>
      <ul>
        <li>Valid BC Security Worker License</li>
        <li>Class 5 Driver's License with a clean abstract</li>
        <li>Minimum 2 years of supervisory experience in security</li>
        <li>Strong incident report writing skills</li>
      </ul>
    `
  },
  {
    id: 2,
    title: "Event Dispatcher - Security",
    company: "Guardem Security Inc.",
    location: "Surrey, BC",
    pay: "$20–$22 an hour",
    type: "Part-time",
    shift: "Evening shift, Weekends",
    urgent: false,
    description: `
      <p>Join our command center team! The Event Dispatcher coordinates communication between field staff, clients, and emergency services during large scale events.</p>
      <br/>
      <p><strong>Key Duties:</strong></p>
      <ul>
        <li>Monitor CCTV and radio traffic</li>
        <li>Log all incidents and dispatch appropriately</li>
        <li>Provide excellent customer service over the phone</li>
      </ul>
      <p><strong>Qualifications:</strong></p>
      <ul>
        <li>Excellent communication and multi-tasking skills</li>
        <li>Proficiency with computer systems and data entry</li>
        <li>Previous dispatch or call center experience is an asset</li>
      </ul>
    `
  },
  {
    id: 3,
    title: "Concierge Security Guard",
    company: "Guardem Security Inc.",
    location: "Downtown Vancouver, BC",
    pay: "$21–$23.50 an hour",
    type: "Full-time",
    shift: "12 hour shift, Day shift",
    urgent: false,
    description: `
      <p>We are looking for polished, customer-service oriented individuals for a premium residential tower in Downtown Vancouver.</p>
      <br/>
      <p><strong>What you will do:</strong></p>
      <ul>
        <li>Control access to the building</li>
        <li>Receive packages and manage resident requests</li>
        <li>Conduct regular interior patrols</li>
        <li>Act as the first point of contact for all building visitors</li>
      </ul>
      <p><strong>What we offer:</strong></p>
      <ul>
        <li>Comprehensive health benefits after 3 months</li>
        <li>Paid breaks and uniform allowance</li>
        <li>Opportunities for advancement into site supervisor roles</li>
      </ul>
    `
  },
  {
    id: 4,
    title: "Loss Prevention Officer",
    company: "Guardem Security Inc.",
    location: "Richmond, BC",
    pay: "$19–$24 an hour",
    type: "Full-time",
    shift: "Weekend availability",
    urgent: true,
    description: `
      <p>Protecting retail assets and ensuring a safe shopping environment. This role involves both uniformed deterrence and plain-clothes operations.</p>
      <br/>
      <p><strong>Duties:</strong></p>
      <ul>
        <li>Identify and apprehend shoplifters in accordance with Canadian laws</li>
        <li>Complete detailed incident reports</li>
        <li>Testify in court when required</li>
      </ul>
      <p><strong>Requirements:</strong></p>
      <ul>
        <li>Valid BC Security License</li>
        <li>Advanced Security Training (AST) is highly preferred</li>
        <li>Physical ability to stand/walk for extended periods</li>
      </ul>
    `
  }
];

// References
const jobListEl = document.getElementById('jobList');
const paneContent = document.getElementById('paneContent');
const emptyState = document.querySelector('.pane-empty-state');
const searchInput = document.getElementById('what');
const searchBtn = document.getElementById('searchBtn');

let activeJobId = null;

// Render Job Cards
function renderJobs(data) {
  jobListEl.innerHTML = '';
  
  if(data.length === 0) {
    jobListEl.innerHTML = '<p style="color:var(--in-gray-text); padding:20px 0;">We could not find any jobs matching your search.</p>';
    document.querySelector('.jobs-count').textContent = '0 jobs at Guardem Security Inc.';
    return;
  }

  document.querySelector('.jobs-count').textContent = \`\${data.length} jobs at Guardem Security Inc.\`;

  data.forEach((job) => {
    const card = document.createElement('div');
    card.className = \`job-card \${activeJobId === job.id ? 'active' : ''}\`;
    card.dataset.id = job.id;
    
    // Snippet (strip HTML tags from description for preview)
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = job.description;
    const snippetText = tempDiv.textContent || tempDiv.innerText || "";

    card.innerHTML = \`
      <h3>\${job.title}</h3>
      <div class="company-name">\${job.company}</div>
      <div class="location">\${job.location}</div>
      
      <div class="job-tags">
        <span class="job-tag">\${job.pay}</span>
        <span class="job-tag">\${job.type}</span>
        <span class="job-tag">\${job.shift}</span>
      </div>
      
      <div class="job-benefits">
        <ul>
          \${job.urgent ? '<li style="color:#d22d2d; font-weight:700; list-style:none; margin-left:-8px;">📌 Urgently hiring</li>' : ''}
          <li>Dental care</li>
          <li>Extended health care</li>
        </ul>
      </div>
      
      <div class="job-snippet">\${snippetText.substring(0, 120)}...</div>
      <div class="job-date">Today</div>
    \`;

    card.addEventListener('click', () => {
      document.querySelectorAll('.job-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      activeJobId = job.id;
      
      // On mobile, clicking a card might open a modal or navigate. Here we just show the pane if visible.
      if (window.innerWidth > 900) {
        showJobDetails(job);
      } else {
        openMobileDetails(job);
      }
    });

    jobListEl.appendChild(card);
  });
}

function showJobDetails(job) {
  emptyState.classList.add('hidden');
  paneContent.classList.remove('hidden');
  
  paneContent.innerHTML = \`
    <div class="pane-header">
      <h2 class="pane-title">\${job.title}</h2>
      <div class="pane-company">\${job.company}</div>
      <div class="pane-location">\${job.location}</div>
      <button class="btn btn-primary pane-apply-btn" onclick="openApplyModal()">Apply Now</button>
      <button class="btn btn-outline" style="width:100%;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px;"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg> Save Job</button>
    </div>
    
    <div class="pane-body">
      <h3 class="pane-section-title">Job details</h3>
      <div style="display:flex; gap:24px; margin-bottom: 24px;">
        <div>
          <strong style="display:block; font-size:12px; color:var(--in-gray-text);">Pay</strong>
          <span style="font-size:14px; background:var(--in-gray-bg); padding:4px 8px; border-radius:4px; display:inline-block; margin-top:4px;">\${job.pay}</span>
        </div>
        <div>
          <strong style="display:block; font-size:12px; color:var(--in-gray-text);">Job type</strong>
          <span style="font-size:14px; background:var(--in-gray-bg); padding:4px 8px; border-radius:4px; display:inline-block; margin-top:4px;">\${job.type}</span>
        </div>
      </div>
      
      <h3 class="pane-section-title">Full job description</h3>
      <div class="pane-desc">
        \${job.description}
      </div>
    </div>
  \`;
}

// Mobile Details (Simplified for demo)
function openMobileDetails(job) {
  // In a real app this would navigate to a single job page or open a full screen modal
  alert(\`Viewing details for: \${job.title}\n\nPlease view on Desktop for the full side-by-side experience.\`);
}

// Search Functionality
function handleSearch() {
  const query = searchInput.value.toLowerCase();
  const filtered = jobs.filter(j => 
    j.title.toLowerCase().includes(query) || 
    j.description.toLowerCase().includes(query)
  );
  activeJobId = null;
  emptyState.classList.remove('hidden');
  paneContent.classList.add('hidden');
  renderJobs(filtered);
}

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keyup', (e) => {
  if(e.key === 'Enter') handleSearch();
});

// Apply Modal Logic
function openApplyModal() {
  let modal = document.querySelector('.modal-overlay');
  if(!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = \`
      <div class="apply-modal">
        <button class="modal-close" onclick="closeApplyModal()">&times;</button>
        <div style="text-align:center; margin-bottom:24px;">
          <img src="assets/logo.jpg" alt="Logo" style="height:40px; margin-bottom:12px; filter:brightness(0) invert(1); background:#0D1B2A; padding:4px; border-radius:4px;"/>
          <h2 style="color:var(--in-blue); font-size:24px; margin-bottom:8px;">Ready to take the next step?</h2>
          <p style="color:var(--in-gray-text);">Apply for <strong id="modalJobTitle"></strong></p>
        </div>
        
        <form class="apply-form" onsubmit="submitApplication(event)">
          <div class="form-group">
            <label>First & Last Name *</label>
            <input type="text" required />
          </div>
          <div class="form-group">
            <label>Email address *</label>
            <input type="email" required />
          </div>
          <div class="form-group">
            <label>Phone number *</label>
            <input type="tel" required />
          </div>
          <div class="form-group">
            <label>Resume (PDF/Doc) *</label>
            <input type="file" required style="padding: 6px;" />
          </div>
          <button type="submit" class="btn btn-primary">Submit Application</button>
        </form>
      </div>
    \`;
    document.body.appendChild(modal);
  }
  
  const currentJob = jobs.find(j => j.id === activeJobId);
  document.getElementById('modalJobTitle').textContent = currentJob ? currentJob.title : 'this position';
  
  modal.style.display = 'flex';
}

function closeApplyModal() {
  const modal = document.querySelector('.modal-overlay');
  if(modal) modal.style.display = 'none';
}

function submitApplication(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Submitting...';
  
  setTimeout(() => {
    form.innerHTML = \`
      <div style="text-align:center; padding: 20px 0;">
        <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" style="width:48px;height:48px;margin-bottom:16px;">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <h3 style="font-size:20px; color:var(--in-gray-dark); margin-bottom:8px;">Application Received</h3>
        <p style="color:var(--in-gray-text);">Thank you for applying. We will review your application and be in touch soon.</p>
        <button class="btn btn-outline" style="margin-top:24px;" onclick="closeApplyModal()">Close</button>
      </div>
    \`;
  }, 1000);
}

// Init
renderJobs(jobs);

// Select first job by default on desktop
if(window.innerWidth > 900 && jobs.length > 0) {
  const firstCard = document.querySelector('.job-card');
  if(firstCard) firstCard.click();
}
