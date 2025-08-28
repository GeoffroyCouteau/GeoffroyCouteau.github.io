// OBELiSC Wiki JavaScript

class OBELiSCWiki {
  constructor() {
    this.isAdminLoggedIn = false;
    this.currentEditingMember = null;
    this.currentEditingPublication = null;
    this.currentEditingPreviousPublication = null;
    this.currentMemberFilter = null;
    this.draggedElement = null;
    this.isReorderMode = false;
    this.isPreviousReorderMode = false;
    this.data = {
      projectDescription: "",
      members: [],
      publications: [],
      previousPublications: [],
      researchGoals: {},
    };

    this.init();
  }

  init() {
    this.loadData();
    this.checkAuthState();
    this.setupEventListeners();
    this.renderContent();
    this.restorePageState();
  }

  // Data Management
  loadData() {
    // Load from localStorage or set defaults
    const savedData = localStorage.getItem("obelisc-wiki-data");
    if (savedData) {
      this.data = JSON.parse(savedData);
      // Check if we need to add initial publications (migration)
      if (!this.data.publications || this.data.publications.length === 0) {
        this.addInitialPublications();
      }

      // Initialize previous publications if not exists
      if (!this.data.previousPublications) {
        this.data.previousPublications = [];
      }

      // Initialize research goals if not exists
      if (
        !this.data.researchGoals ||
        Object.keys(this.data.researchGoals).length === 0
      ) {
        this.initializeResearchGoals();
      }

      // Initialize progress data if not exists
      if (!this.data.progress) {
        this.data.progress = {
          "rg1-specific": 75,
          "rg1-ole": 60,
          "rg1-unbounded": 40,
          "rg1-multiparty": 25,
          "rg2-nisp": 30,
          "rg2-nizk": 80,
          "rg2-foundations": 65,
          "rg3-multiparty": 45,
          "rg3-general": 55,
          "rg3-barriers": 20,
        };
      }

      // Initialize work package remarks if not exists
      if (!this.data.workPackageRemarks) {
        this.data.workPackageRemarks = {};
      }

      // Fix plain text descriptions and restore proper HTML formatting
      if (
        this.data.projectDescription &&
        (this.data.projectDescription.includes(
          "The importance of maintaining data privacy",
        ) ||
          this.data.projectDescription.includes(
            "Privacy-preserving communication has become the norm",
          ) ||
          // Detect plain text version (missing HTML tags)
          (this.data.projectDescription.includes("Central Vision") &&
            !this.data.projectDescription.includes("<p>"))) &&
        !this.data.projectDescription.includes('<div class="central-vision">')
      ) {
        this.data.projectDescription = `<p>Privacy-preserving communication has become the norm over large-scale networks: around 85% of Internet traffic is now encrypted. However, our use of these networks is also evolving rapidly. The modern user searches through pictures stored in the Cloud, gets video recommendations, sees targeted advertising, and uses healthcare and social apps. In each of these situations, <strong>a third party is performing computations on our private data</strong> (our pictures, navigation history, preferences, etc.). This creates a fundamental tension between utility and privacy.</p>

<div class="central-vision">
  <div class="vision-content">
    <h4><i class="fas fa-bullseye"></i> Central Vision</h4>
    <p>The ultimate goal of OBELiSC is to enable the construction of networks where <strong>privacy is guaranteed by default</strong>, even when private data is <strong>used in computations</strong> involving third parties.</p>
  </div>
</div>

<p><strong>Secure computation</strong> addresses this challenge by enabling multiple participants to distributively execute computations on their sensitive data without compromising confidentiality. Our approach draws inspiration from the success of secure communication protocols, which already protect the vast majority of web communications through technologies like TLS.</p>

<p>Just as secure communication achieved widespread adoption through key architectural features, OBELiSC focuses on developing secure computation protocols that <strong>mimic the core features of secure communication networks</strong>:</p>

<ul class="feature-list">
  <li><strong>Two-phase structure:</strong> A heavy preprocessing phase followed by lightweight online computation</li>
  <li><strong>Non-interactive protocols:</strong> Parties can participate without being simultaneously online</li>
  <li><strong>Minimal communication overhead:</strong> Efficient bandwidth usage comparable to insecure alternatives</li>
  <li><strong>Diverse security foundations:</strong> Multiple cryptographic assumptions for robust security</li>
</ul>

<p>By achieving these landmark features, OBELiSC aims to make secure computation practical for deployment over large-scale networks, ultimately realizing a world where <strong>privacy-by-default</strong> becomes the standard for distributed computations.</p>`;
        this.saveData();
      }
    } else {
      // Set initial project description
      this.data.projectDescription = `<p>Privacy-preserving communication has become the norm over large-scale networks: around 85% of Internet traffic is now encrypted. However, our use of these networks is also evolving rapidly. The modern user searches through pictures stored in the Cloud, gets video recommendations, sees targeted advertising, and uses healthcare and social apps. In each of these situations, <strong>a third party is performing computations on our private data</strong> (our pictures, navigation history, preferences, etc.). This creates a fundamental tension between utility and privacy.</p>

<div class="central-vision">
  <div class="vision-content">
    <h4><i class="fas fa-bullseye"></i> Central Vision</h4>
    <p>The ultimate goal of OBELiSC is to enable the construction of networks where <strong>privacy is guaranteed by default</strong>, even when private data is <strong>used in computations</strong> involving third parties.</p>
  </div>
</div>

<p><strong>Secure computation</strong> addresses this challenge by enabling multiple participants to distributively execute computations on their sensitive data without compromising confidentiality. Our approach draws inspiration from the success of secure communication protocols, which already protect the vast majority of web communications through technologies like TLS.</p>

<p>Just as secure communication achieved widespread adoption through key architectural features, OBELiSC focuses on developing secure computation protocols that <strong>mimic the core features of secure communication networks</strong>:</p>

<ul class="feature-list">
  <li><strong>Two-phase structure:</strong> A heavy preprocessing phase followed by lightweight online computation</li>
  <li><strong>Non-interactive protocols:</strong> Parties can participate without being simultaneously online</li>
  <li><strong>Minimal communication overhead:</strong> Efficient bandwidth usage comparable to insecure alternatives</li>
  <li><strong>Diverse security foundations:</strong> Multiple cryptographic assumptions for robust security</li>
</ul>

<p>By achieving these landmark features, OBELiSC aims to make secure computation practical for deployment over large-scale networks, ultimately realizing a world where <strong>privacy-by-default</strong> becomes the standard for distributed computations.</p>`;

      // Add initial team member (project leader)
      this.data.members = [
        {
          id: Date.now(),
          firstName: "Geoffroy",
          lastName: "Couteau",
          startDate: "2023-01-01",
          endDate: "",
          website: "https://geoffroycouteau.github.io/",
          role: "PI",
        },
      ];

      // Add initial publications
      this.data.publications = [
        {
          id: Date.now() + 1,
          title:
            "Instantiating the Hash-Then-Evaluate Paradigm: Strengthening PRFs, PCFs, and OPRFs",
          authors:
            "Chris Brzuska, Geoffroy Couteau, Christoph Egger, and Pierre Meyer",
          venue: "Cryptography and Communications 2025",
          workPackage: "",
          description: "",
        },
        {
          id: Date.now() + 2,
          title:
            "Structured-Seed Local Pseudorandom Generators and their Applications",
          authors:
            "Benny Applebaum, Dung Bui, Geoffroy Couteau and Nikolas Melissaris",
          venue: "RANDOM 2025",
          workPackage: "",
          description: "",
        },
        {
          id: Date.now() + 3,
          title: "Downlink (T)FHE ciphertexts compression",
          authors:
            "Antonina Bondarchuk, Olive Chakraborty, Geoffroy Couteau, and Renaud Sirdey",
          venue: "SAC 2025",
          workPackage: "",
          description: "",
        },
        {
          id: Date.now() + 4,
          title: "ω(1/λ)-Rate Boolean Garbling Scheme from Generic Groups",
          authors:
            "Geoffroy Couteau, Carmit Hazay, Aditya Hegde, and Naman Kumar",
          venue: "CRYPTO 2025",
          workPackage: "",
          description: "",
        },
        {
          id: Date.now() + 5,
          title: "Multi-key Homomorphic Secret Sharing",
          authors:
            "Geoffroy Couteau, Lalita Devadas, Aditya Hegde, Abhishek Jain, and Sacha Servan-Schreiber",
          venue: "EUROCRYPT 2025",
          workPackage: "",
          description: "",
        },
        {
          id: Date.now() + 6,
          title: "Breaking the 1/λ-Rate Barrier for Arithmetic Garbling",
          authors:
            "Geoffroy Couteau, Carmit Hazay, Aditya Hegde, and Naman Kumar",
          venue: "EUROCRYPT 2025",
          workPackage: "",
          description: "",
        },
        {
          id: Date.now() + 7,
          title: "Enhanced Trapdoor Hashing from DDH and DCR",
          authors: "Geoffroy Couteau, Aditya Hegde, and Sihang Pu",
          venue: "EUROCRYPT 2025",
          workPackage: "",
          description: "",
        },
        {
          id: Date.now() + 8,
          title:
            "An Efficient ZK Compiler from SIMD Circuits to General Circuits",
          authors:
            "Dung Bui, Haotian Chu, Geoffroy Couteau, Xiao Wang, Chenkai Weng, Kang Yang, and Yu Yu",
          venue: "JoC 2025",
          workPackage: "",
          description: "",
        },
        {
          id: Date.now() + 9,
          title:
            "On Building Fine-Grained One-Way Functions from Strong Average-Case Hardness",
          authors: "Chris Brzuska and Geoffroy Couteau",
          venue: "JoC 2025",
          workPackage: "",
          description: "",
        },
        {
          id: Date.now() + 10,
          title: "On Bounded Storage Key Agreement and One-Way Functions",
          authors:
            "Chris Brzuska, Christoph Egger, Geoffroy Couteau, and Willy Quach",
          venue: "TCC 2024",
          workPackage: "",
          description: "",
        },
        {
          id: Date.now() + 11,
          title:
            "A Note on Low-Communication Secure Multiparty Computation via Circuit Depth-Reduction",
          authors:
            "Pierre Charbit, Geoffroy Couteau, Pierre Meyer, and Reza Naserasr",
          venue: "TCC 2024",
          workPackage: "",
          description: "",
        },
      ];

      this.addInitialPublications();
      this.initializeResearchGoals();
      this.saveData();
    }
  }

  initializeResearchGoals() {
    this.data.researchGoals = {
      rg1: {
        title: "RG1: Efficiency and Scalability of Silent Preprocessing",
        subtitle: "Research Goal 1",
        description:
          "Silent preprocessing allows to generate correlated (pseudo)randomness tailored to specific computations, achieving unprecedented efficiency in secure computation protocols.",
        workPackages: [
          {
            title: "Silent preprocessing for specific functions",
            id: "rg1-specific",
            questions: [
              "Can we construct concretely efficient silent preprocessing protocols for correlations tailored to useful functions, such as set operations, comparisons, or functions occurring in statistical analysis, medical research, and recommendation systems?",
            ],
            description:
              "One can be more fine-grained by looking at specific functionalities. For concrete functionalities, better efficiency can be achieved by choosing a tailored type of correlated randomness.",
          },
          {
            title:
              "Silent preprocessing for oblivious linear evaluation correlations",
            id: "rg1-ole",
            questions: [
              "Can we construct silent preprocessing protocols for OLE correlations with linear computational overhead?",
              "Can we construct silent preprocessing protocols for OLE correlations over small fields? Can it be done over the smallest possible field, F₂?",
              "Can we construct silent preprocessing for OLE correlations using better-understood assumptions, such as standard code-based assumptions?",
            ],
            description:
              "Target general forms of correlated randomness and lift remaining barriers towards making them efficient, usable, and based on strong security foundations.",
          },
          {
            title: "Unbounded, on-demand silent preprocessing",
            id: "rg1-unbounded",
            questions: [
              "Can we construct pseudorandom correlation functions with efficiency competitive with that of pseudorandom correlation generators?",
            ],
            description:
              "Pseudorandom correlation functions circumvent the single-use limitation and provide on-demand, unbounded amount of correlated pseudorandomness.",
          },
          {
            title: "Multiparty silent preprocessing",
            id: "rg1-multiparty",
            questions: [
              "Can we construct n-party silent preprocessing protocols with a cost scaling with n, for the most useful n-party correlations, such as Beaver triples?",
            ],
            description:
              "The most ambitious goal: obtain the first direct constructions of multiparty silent preprocessing protocols that scale linearly with the number of parties.",
          },
        ],
      },
      rg2: {
        title: "RG2: Non-Interactive Secure Computation",
        subtitle: "Research Goal 2",
        description:
          "Achieve the non-interactive structure of secure communication protocols for secure computation, removing the need for parties to coordinate being online simultaneously.",
        workPackages: [
          {
            title: "Non-interactive silent preprocessing",
            id: "rg2-nisp",
            questions: [
              "Is it possible to construct non-interactive secure protocols for silent preprocessing with better concrete efficiency?",
              "Is it possible to construct non-interactive secure protocols for silent preprocessing for more general types of correlations?",
            ],
            description:
              "When constructing new silent preprocessing protocols, make them fully non-interactive to enable secure computation networks to scale.",
          },
          {
            title: "Efficient non-interactive zero-knowledge proofs",
            id: "rg2-nizk",
            questions: [
              "Can we construct more efficient non-interactive zero-knowledge proofs for statements of interest in real-world applications, such as range proofs and membership proofs?",
              "Can we construct efficient post-quantum non-interactive zero-knowledge proofs for the above statements?",
            ],
            description:
              "Target concrete, real-world efficiency for zero-knowledge proofs, which are becoming widely used in mainstream products with ongoing standardization efforts.",
          },
          {
            title: "Theoretical security foundations of NIZKs",
            id: "rg2-foundations",
            questions: [
              "Can we base the security of non-interactive zero-knowledge proofs on traditional hardness assumptions such as the decisional or computation Diffie-Hellman assumptions?",
              "Is public-key cryptography necessary for non-interactive zero-knowledge proofs? Can we construct NIZKs from assumptions not known to imply public-key cryptography?",
            ],
            description:
              "Relate the security of NIZKs to the most plausible and best-studied assumptions, answering fundamental questions about their necessity.",
          },
        ],
      },
      rg3: {
        title: "RG3: Low Communication Secure Computation",
        subtitle: "Research Goal 3",
        description:
          "Investigate new approaches to achieve sublinear communication complexity in secure computation without relying on fully homomorphic encryption.",
        workPackages: [
          {
            title: "Multiparty low-communication protocols",
            id: "rg3-multiparty",
            questions: [
              "Can we achieve sublinear secure computation between 3 or more parties without fully homomorphic encryption?",
            ],
            description:
              "Large-scale secure computation should enjoy low communication for all participants, not just two-party functionalities.",
          },
          {
            title: "General circuit support",
            id: "rg3-general",
            questions: [
              "Can we achieve sublinear secure computation for all polynomial-size circuits (rather than layered circuits) without fully homomorphic encryption?",
            ],
            description:
              "Move beyond the current limitation to structured/layered circuits to support arbitrary polynomial-size computations.",
          },
          {
            title: "Breaking communication barriers",
            id: "rg3-barriers",
            questions: [
              "Can we break the O(s/log s) communication barrier for secure computation without fully homomorphic encryption?",
              "Can we break the O(s/log log s) communication barrier for secure computation with silent preprocessing?",
            ],
            description:
              "The most intriguing questions: can FHE-free approaches achieve better communication savings than current barriers?",
          },
        ],
      },
    };
  }

  addInitialPublications() {
    this.data.publications = [
      {
        id: Date.now() + 1,
        title:
          "Instantiating the Hash-Then-Evaluate Paradigm: Strengthening PRFs, PCFs, and OPRFs",
        authors:
          "Chris Brzuska, Geoffroy Couteau, Christoph Egger, and Pierre Meyer",
        venue: "Cryptography and Communications 2025",
        workPackages: ["rg1-specific", "rg2-foundations"],
        description: "",
      },
      {
        id: Date.now() + 2,
        title:
          "Structured-Seed Local Pseudorandom Generators and their Applications",
        authors:
          "Benny Applebaum, Dung Bui, Geoffroy Couteau and Nikolas Melissaris",
        venue: "RANDOM 2025",
        workPackages: ["rg1-ole"],
        description: "",
      },
      {
        id: Date.now() + 3,
        title: "Downlink (T)FHE ciphertexts compression",
        authors:
          "Antonina Bondarchuk, Olive Chakraborty, Geoffroy Couteau, and Renaud Sirdey",
        venue: "SAC 2025",
        workPackages: ["rg3-general"],
        description: "",
      },
      {
        id: Date.now() + 4,
        title: "ω(1/λ)-Rate Boolean Garbling Scheme from Generic Groups",
        authors:
          "Geoffroy Couteau, Carmit Hazay, Aditya Hegde, and Naman Kumar",
        venue: "CRYPTO 2025",
        workPackages: ["rg1-specific", "rg3-barriers"],
        description: "",
      },
      {
        id: Date.now() + 5,
        title: "Multi-key Homomorphic Secret Sharing",
        authors:
          "Geoffroy Couteau, Lalita Devadas, Aditya Hegde, Abhishek Jain, and Sacha Servan-Schreiber",
        venue: "EUROCRYPT 2025",
        workPackages: ["rg1-multiparty", "rg3-multiparty"],
        description: "",
      },
      {
        id: Date.now() + 6,
        title: "Breaking the 1/λ-Rate Barrier for Arithmetic Garbling",
        authors:
          "Geoffroy Couteau, Carmit Hazay, Aditya Hegde, and Naman Kumar",
        venue: "EUROCRYPT 2025",
        workPackages: ["rg1-ole", "rg3-barriers"],
        description: "",
      },
      {
        id: Date.now() + 7,
        title: "Enhanced Trapdoor Hashing from DDH and DCR",
        authors: "Geoffroy Couteau, Aditya Hegde, and Sihang Pu",
        venue: "EUROCRYPT 2025",
        workPackages: ["rg2-foundations"],
        description: "",
      },
      {
        id: Date.now() + 8,
        title:
          "An Efficient ZK Compiler from SIMD Circuits to General Circuits",
        authors:
          "Dung Bui, Haotian Chu, Geoffroy Couteau, Xiao Wang, Chenkai Weng, Kang Yang, and Yu Yu",
        venue: "JoC 2025",
        workPackages: ["rg2-nizk", "rg3-general"],
        description: "",
      },
      {
        id: Date.now() + 9,
        title:
          "On Building Fine-Grained One-Way Functions from Strong Average-Case Hardness",
        authors: "Chris Brzuska and Geoffroy Couteau",
        venue: "JoC 2025",
        workPackages: ["rg2-foundations"],
        description: "",
      },
      {
        id: Date.now() + 10,
        title: "On Bounded Storage Key Agreement and One-Way Functions",
        authors:
          "Chris Brzuska, Christoph Egger, Geoffroy Couteau, and Willy Quach",
        venue: "TCC 2024",
        workPackages: ["rg1-specific", "rg2-foundations"],
        description: "",
      },
      {
        id: Date.now() + 11,
        title:
          "A Note on Low-Communication Secure Multiparty Computation via Circuit Depth-Reduction",
        authors:
          "Pierre Charbit, Geoffroy Couteau, Pierre Meyer, and Reza Naserasr",
        venue: "TCC 2024",
        workPackages: ["rg3-multiparty", "rg3-barriers"],
        description: "",
      },
    ];
    this.saveData();
  }

  saveData() {
    localStorage.setItem("obelisc-wiki-data", JSON.stringify(this.data));
  }

  // Authentication
  checkAuthState() {
    const authState = sessionStorage.getItem("obelisc-admin-auth");
    if (authState === "true") {
      this.loginAdmin();
    }
  }

  loginAdmin() {
    this.isAdminLoggedIn = true;
    sessionStorage.setItem("obelisc-admin-auth", "true");
    document.body.classList.add("admin-logged-in");

    // Show admin elements
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("adminPanel").classList.remove("hidden");

    // Remove hidden class from all admin-only elements
    this.showAdminElements();

    // Progress bars now use input controls instead of drag interaction

    // Only close modal if it exists (avoid error during auth state restoration)
    const loginModal = document.getElementById("loginModal");
    if (loginModal && !loginModal.classList.contains("hidden")) {
      this.closeModal("loginModal");
    }
  }

  showAdminElements() {
    document.querySelectorAll(".admin-only").forEach((element) => {
      element.classList.remove("hidden");
    });

    // Progress bars now use input controls instead of drag interaction
  }

  toggleReorderMode() {
    this.isReorderMode = !this.isReorderMode;
    const reorderBtn = document
      .getElementById("reorderPublicationsBtn")
      .querySelector("button");

    if (this.isReorderMode) {
      reorderBtn.innerHTML = '<i class="fas fa-times"></i> Exit Reorder Mode';
      reorderBtn.classList.remove("btn-secondary");
      reorderBtn.classList.add("btn-tertiary");
      this.showReorderArrows();
    } else {
      reorderBtn.innerHTML =
        '<i class="fas fa-arrows-alt"></i> Reorder Publications';
      reorderBtn.classList.remove("btn-tertiary");
      reorderBtn.classList.add("btn-secondary");
      this.hideReorderArrows();
    }
  }

  togglePreviousReorderMode() {
    this.isPreviousReorderMode = !this.isPreviousReorderMode;
    const reorderBtn = document
      .getElementById("reorderPreviousPublicationsBtn")
      .querySelector("button");

    if (this.isPreviousReorderMode) {
      reorderBtn.innerHTML = '<i class="fas fa-times"></i> Exit Reorder Mode';
      reorderBtn.classList.remove("btn-secondary");
      reorderBtn.classList.add("btn-tertiary");
      this.showPreviousReorderArrows();
    } else {
      reorderBtn.innerHTML =
        '<i class="fas fa-arrows-alt"></i> Reorder Publications';
      reorderBtn.classList.remove("btn-tertiary");
      reorderBtn.classList.add("btn-secondary");
      this.hidePreviousReorderArrows();
    }
  }

  showReorderArrows() {
    const publications = document.querySelectorAll(".publication");
    publications.forEach((pub, index) => {
      pub.classList.add("reorder-mode");

      // Add reorder arrows container if it doesn't exist
      if (!pub.querySelector(".reorder-arrows")) {
        const arrowsContainer = document.createElement("div");
        arrowsContainer.className = "reorder-arrows";

        const upBtn = document.createElement("button");
        upBtn.className = "btn btn-secondary btn-small btn-icon reorder-up";
        upBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        upBtn.title = "Move Up";
        upBtn.onclick = (e) => {
          e.stopPropagation();
          this.movePublicationUp(parseInt(pub.dataset.id));
        };

        const downBtn = document.createElement("button");
        downBtn.className = "btn btn-secondary btn-small btn-icon reorder-down";
        downBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        downBtn.title = "Move Down";
        downBtn.onclick = (e) => {
          e.stopPropagation();
          this.movePublicationDown(parseInt(pub.dataset.id));
        };

        // Disable up arrow for first item
        if (index === 0) {
          upBtn.disabled = true;
          upBtn.classList.add("disabled");
        }

        // Disable down arrow for last item
        if (index === publications.length - 1) {
          downBtn.disabled = true;
          downBtn.classList.add("disabled");
        }

        arrowsContainer.appendChild(upBtn);
        arrowsContainer.appendChild(downBtn);
        pub.appendChild(arrowsContainer);
      }
    });
  }

  hideReorderArrows() {
    const publications = document.querySelectorAll(".publication");
    publications.forEach((pub) => {
      pub.classList.remove("reorder-mode");
      const arrowsContainer = pub.querySelector(".reorder-arrows");
      if (arrowsContainer) {
        arrowsContainer.remove();
      }
    });
  }

  showPreviousReorderArrows() {
    const publications = document.querySelectorAll(
      "#previousPublicationsList .publication",
    );
    publications.forEach((pub, index) => {
      pub.classList.add("reorder-mode");

      // Add reorder arrows container if it doesn't exist
      if (!pub.querySelector(".reorder-arrows")) {
        const arrowsContainer = document.createElement("div");
        arrowsContainer.className = "reorder-arrows";

        const upBtn = document.createElement("button");
        upBtn.className = "btn btn-secondary btn-small btn-icon reorder-up";
        upBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        upBtn.title = "Move Up";
        upBtn.onclick = () =>
          this.movePreviousPublicationUp(parseInt(pub.dataset.id));

        const downBtn = document.createElement("button");
        downBtn.className = "btn btn-secondary btn-small btn-icon reorder-down";
        downBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        downBtn.title = "Move Down";
        downBtn.onclick = () =>
          this.movePreviousPublicationDown(parseInt(pub.dataset.id));

        arrowsContainer.appendChild(upBtn);
        arrowsContainer.appendChild(downBtn);
        pub.insertBefore(arrowsContainer, pub.firstChild);
      }

      // Disable arrows at edges
      const upBtn = pub.querySelector(".reorder-up");
      const downBtn = pub.querySelector(".reorder-down");

      if (index === 0) {
        upBtn.disabled = true;
        upBtn.classList.add("disabled");
      } else {
        upBtn.disabled = false;
        upBtn.classList.remove("disabled");
      }

      if (index === publications.length - 1) {
        downBtn.disabled = true;
        downBtn.classList.add("disabled");
      } else {
        downBtn.disabled = false;
        downBtn.classList.remove("disabled");
      }
    });
  }

  hidePreviousReorderArrows() {
    const publications = document.querySelectorAll(
      "#previousPublicationsList .publication",
    );
    publications.forEach((pub) => {
      pub.classList.remove("reorder-mode");
      const arrowsContainer = pub.querySelector(".reorder-arrows");
      if (arrowsContainer) {
        arrowsContainer.remove();
      }
    });
  }

  hideAdminElements() {
    document.querySelectorAll(".admin-only").forEach((element) => {
      element.classList.add("hidden");
    });
  }

  logoutAdmin() {
    this.isAdminLoggedIn = false;
    sessionStorage.removeItem("obelisc-admin-auth");
    document.body.classList.remove("admin-logged-in");

    // Hide admin elements
    document.getElementById("loginBtn").style.display = "block";
    document.getElementById("adminPanel").classList.add("hidden");

    // Add hidden class back to all admin-only elements
    this.hideAdminElements();
  }

  // Event Listeners
  setupEventListeners() {
    // Prevent multiple setup
    if (this._eventListenersSetup) return;
    this._eventListenersSetup = true;

    // Navigation
    document.querySelectorAll(".nav-link").forEach((link) => {
      if (!link._hasListener) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const target = link.getAttribute("href").substring(1);
          this.showSection(target);

          // Update active nav link
          document
            .querySelectorAll(".nav-link")
            .forEach((l) => l.classList.remove("active"));
          link.classList.add("active");

          // Save current page state
          this.savePageState(target);
        });
        link._hasListener = true;
      }
    });

    // Auth buttons
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn && !loginBtn._hasListener) {
      loginBtn.addEventListener("click", () => {
        this.showModal("loginModal");
      });
      loginBtn._hasListener = true;
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn && !logoutBtn._hasListener) {
      logoutBtn.addEventListener("click", () => {
        this.logoutAdmin();
      });
      logoutBtn._hasListener = true;
    }

    document
      .getElementById("forgotPasswordBtn")
      .addEventListener("click", () => {
        this.closeModal("loginModal");
        this.showModal("recoveryModal");
      });

    // Login form - prevent duplicate listeners
    const loginForm = document.getElementById("loginForm");
    if (loginForm && !loginForm._hasListener) {
      const handleLogin = (e) => {
        e.preventDefault();
        const password = document.getElementById("password").value.trim();

        if (password === "0B3Li5C_2024") {
          this.loginAdmin();
          document.getElementById("password").value = "";
        } else {
          this.showError("Invalid password. Please try again.");
        }
      };

      loginForm.addEventListener("submit", handleLogin);
      loginForm._hasListener = true;
    }

    // Edit buttons
    document.getElementById("editOverviewBtn").addEventListener("click", () => {
      this.editProjectDescriptionSections();
    });

    document.getElementById("addMemberBtn").addEventListener("click", () => {
      this.currentEditingMember = null;
      this.resetMemberForm();
      document.getElementById("memberModalTitle").textContent =
        "Add Team Member";
      this.showModal("memberModal");
    });

    document
      .getElementById("reorderPublicationsBtn")
      .addEventListener("click", () => {
        this.toggleReorderMode();
      });

    document
      .getElementById("reorderPreviousPublicationsBtn")
      .addEventListener("click", () => {
        this.togglePreviousReorderMode();
      });

    // Add publication button
    document
      .getElementById("addPublicationBtn")
      .addEventListener("click", () => {
        this.resetPublicationForm();
        this.currentEditingPublication = null;
        document.getElementById("publicationModalTitle").textContent =
          "Add Publication";
        this.showModal("publicationModal");
      });

    // Previous publications buttons
    document
      .getElementById("addPreviousPublicationBtn")
      .addEventListener("click", () => {
        this.resetPublicationForm();
        this.currentEditingPreviousPublication = null;
        document.getElementById("publicationModalTitle").textContent =
          "Add Previous Publication";
        this.showModal("publicationModal");
      });

    // Forms
    document
      .getElementById("editDescriptionForm")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const description = document.getElementById("descriptionText").value;
        this.updateProjectDescription(description);
      });

    document.getElementById("memberForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.saveMember();
    });

    document
      .getElementById("publicationForm")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        this.savePublication();
      });

    // Publication filters
    // Filter buttons - only handle main RG filters, sub-filters are handled in updateWorkPackageFilters
    document
      .querySelectorAll(".filter-btn:not(.sub-filter-btn)")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          // Only remove active class from main filter buttons, not sub-filter buttons
          document
            .querySelectorAll(".filter-btn:not(.sub-filter-btn)")
            .forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          this.filterPublications(btn.dataset.filter);
        });
      });

    // Previous publications filter buttons
    document.querySelectorAll(".filter-btn-prev").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".filter-btn-prev")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.filterPreviousPublications(btn.dataset.filter);
      });
    });

    // Modal close handlers
    document.querySelectorAll(".modal-close").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const modal = btn.closest(".modal");
        this.closeModal(modal.id);
      });
    });

    // Click outside modal to close
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          this.closeModal(modal.id);
        }
      });
    });
  }

  // UI Management
  showSection(sectionId) {
    document.querySelectorAll(".content-section").forEach((section) => {
      section.classList.remove("active");
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add("active");
    }

    // If navigating to publications section, reset any member filter
    if (sectionId === "publications" && this.currentMemberFilter) {
      this.resetPublicationsView();
    }

    // Save current page state
    this.savePageState(sectionId);
  }

  savePageState(sectionId) {
    sessionStorage.setItem("obelisc-current-page", sectionId);
  }

  restorePageState() {
    const savedPage = sessionStorage.getItem("obelisc-current-page");
    if (savedPage && savedPage !== "overview") {
      if (savedPage.startsWith("rg-detail-")) {
        // Show research goal detail page
        const wpType = savedPage.replace("rg-detail-", "");
        this.showResearchGoalDetail(wpType);
      } else {
        // Show regular section
        this.showSection(savedPage);

        // Update navigation
        document
          .querySelectorAll(".nav-link")
          .forEach((l) => l.classList.remove("active"));
        const navLink = document.querySelector(`a[href="#${savedPage}"]`);
        if (navLink) {
          navLink.classList.add("active");
        }
      }
    }
  }

  showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove("hidden");
    // Focus first input if exists
    const firstInput = modal.querySelector("input, textarea");
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("hidden");
      // Remove dynamically created modals
      if (
        modalId === "editDescriptionSectionsModal" ||
        modalId === "editRemarksModal"
      ) {
        modal.remove();
      }
    }
  }

  showError(message) {
    // Simple alert for now - could be enhanced with custom notification system
    alert(message);
  }

  showSuccess(message) {
    // Simple alert for now - could be enhanced with custom notification system
    alert(message);
    this.renderContent();
  }

  renderContent() {
    this.renderProjectDescription();
    this.renderTeamMembers();
    this.renderPublications();
    this.renderPreviousPublications();

    // Restore admin state after rendering
    if (this.isAdminLoggedIn) {
      this.showAdminElements();
      // Progress bars now use input controls instead of drag interaction
    }
  }

  renderProjectDescription() {
    const container = document.getElementById("projectDescription");
    container.innerHTML = this.data.projectDescription;
  }

  renderTeamMembers() {
    const container = document.getElementById("teamGrid");
    container.innerHTML = "";

    this.data.members.forEach((member) => {
      const memberDiv = document.createElement("div");
      memberDiv.className = "team-member";

      const endDateText = member.endDate
        ? ` - ${this.formatDate(member.endDate)}`
        : " - Present";
      const websiteHtml = member.website
        ? `<a href="${member.website}" target="_blank" class="member-website">
                    <i class="fas fa-external-link-alt"></i> Website
                </a>`
        : "";

      const roleHtml = member.role
        ? `<div class="member-role">${this.getRoleName(member.role)}</div>`
        : "";

      memberDiv.innerHTML = `
                <div class="member-name">${member.firstName} ${member.lastName}</div>
                ${roleHtml}
                <div class="member-duration">${this.formatDate(member.startDate)}${endDateText}</div>
                ${websiteHtml}
                <button class="member-publications-btn" onclick="wiki.showMemberPublications(${member.id})" title="View Publications">
                    <i class="fas fa-book"></i> Publications
                </button>
                <div class="member-actions admin-only">
                    <button class="btn btn-primary btn-small btn-icon" onclick="wiki.editMember(${member.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-tertiary btn-small btn-icon" onclick="wiki.deleteMember(${member.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

      container.appendChild(memberDiv);
    });

    if (this.data.members.length === 0) {
      container.innerHTML =
        '<p class="text-muted text-center">No team members added yet.</p>';
    }
  }

  renderPublications(filter = null) {
    const container = document.getElementById("publicationsList");
    container.innerHTML = "";

    const visiblePublications = this.getFilteredPublications(filter);

    visiblePublications.forEach((publication, index) => {
      const pubDiv = document.createElement("div");
      pubDiv.className = "publication";
      pubDiv.dataset.wp =
        publication.workPackages && publication.workPackages.length > 0
          ? publication.workPackages.join(" ")
          : "";
      pubDiv.dataset.id = publication.id;
      pubDiv.dataset.index = index;

      const wpBadges =
        publication.workPackages && publication.workPackages.length > 0
          ? publication.workPackages
              .map(
                (wp) =>
                  `<span class="publication-wp" data-wp="${wp}">
              ${this.getWorkPackageName(wp)}
            </span>`,
              )
              .join("")
          : "";

      const description = publication.description
        ? `<div class="publication-description">${publication.description}</div>`
        : "";

      const dragHandle = this.isAdminLoggedIn
        ? `<div class="drag-handle" title="Drag to reorder"><i class="fas fa-grip-vertical"></i></div>`
        : "";

      pubDiv.innerHTML = `
                ${dragHandle}
                <div class="publication-title">${publication.title}</div>
                <div class="publication-authors">${publication.authors}</div>
                <div class="publication-venue">${publication.venue}</div>
                <div class="publication-wp-badges">${wpBadges}</div>
                ${description}
                <div class="publication-actions admin-only">
                    <button class="btn btn-primary btn-small btn-icon" onclick="wiki.editPublication(${publication.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-tertiary btn-small btn-icon" onclick="wiki.deletePublication(${publication.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

      container.appendChild(pubDiv);
    });

    // Set up reorder mode if active
    if (this.isAdminLoggedIn) {
      if (this.isReorderMode) {
        this.showReorderArrows();
      }
      // Ensure admin elements are visible after rendering
      this.showAdminElements();
    }

    if (visiblePublications.length === 0) {
      container.innerHTML =
        '<p class="text-muted text-center">No publications found for the selected filter.</p>';
    }
  }

  renderPreviousPublications(filter = null) {
    const container = document.getElementById("previousPublicationsList");
    container.innerHTML = "";

    const visiblePublications = this.getFilteredPreviousPublications(filter);

    visiblePublications.forEach((publication, index) => {
      const pubDiv = document.createElement("div");
      pubDiv.className = "publication";
      pubDiv.dataset.wp =
        publication.workPackages && publication.workPackages.length > 0
          ? publication.workPackages.join(" ")
          : "";
      pubDiv.dataset.id = publication.id;
      pubDiv.dataset.index = index;

      const wpBadges =
        publication.workPackages && publication.workPackages.length > 0
          ? publication.workPackages
              .map(
                (wp) =>
                  `<span class="publication-wp" data-wp="${wp}">
              ${this.getWorkPackageName(wp)}
            </span>`,
              )
              .join("")
          : "";

      const description = publication.description
        ? `<div class="publication-description">${publication.description}</div>`
        : "";

      const dragHandle = this.isPreviousReorderMode
        ? '<div class="drag-handle"><i class="fas fa-grip-vertical"></i></div>'
        : "";

      pubDiv.innerHTML = `
                ${dragHandle}
                <div class="publication-title">${publication.title}</div>
                <div class="publication-authors">${publication.authors}</div>
                <div class="publication-venue">${publication.venue}</div>
                <div class="publication-wp-badges">${wpBadges}</div>
                ${description}
                <div class="publication-actions admin-only">
                    <button class="btn btn-primary btn-small btn-icon" onclick="wiki.editPreviousPublication(${publication.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-tertiary btn-small btn-icon" onclick="wiki.deletePreviousPublication(${publication.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

      container.appendChild(pubDiv);
    });

    if (visiblePublications.length === 0) {
      container.innerHTML =
        '<p class="text-muted text-center">No previous publications found for the selected filter.</p>';
    }

    if (this.isAdminLoggedIn) {
      if (this.isPreviousReorderMode) {
        this.showPreviousReorderArrows();
      }
      this.showAdminElements();
    }
  }

  movePublicationUp(id) {
    const index = this.data.publications.findIndex((p) => p.id === id);
    if (index > 0) {
      // Swap with previous publication
      const temp = this.data.publications[index];
      this.data.publications[index] = this.data.publications[index - 1];
      this.data.publications[index - 1] = temp;

      this.saveData();
      this.renderPublications();
      console.log("Publication moved up successfully");
    }
  }

  movePublicationDown(id) {
    const index = this.data.publications.findIndex((p) => p.id === id);
    if (index < this.data.publications.length - 1) {
      // Swap with next publication
      const temp = this.data.publications[index];
      this.data.publications[index] = this.data.publications[index + 1];
      this.data.publications[index + 1] = temp;

      this.saveData();
      this.renderPublications();
      console.log("Publication moved down successfully");
    }
  }

  movePreviousPublicationUp(id) {
    const index = this.data.previousPublications.findIndex((p) => p.id === id);
    if (index > 0) {
      // Swap with previous publication
      const temp = this.data.previousPublications[index];
      this.data.previousPublications[index] =
        this.data.previousPublications[index - 1];
      this.data.previousPublications[index - 1] = temp;

      this.saveData();
      this.renderPreviousPublications();
      console.log("Previous publication moved up successfully");
    }
  }

  movePreviousPublicationDown(id) {
    const index = this.data.previousPublications.findIndex((p) => p.id === id);
    if (index < this.data.previousPublications.length - 1) {
      // Swap with next publication
      const temp = this.data.previousPublications[index];
      this.data.previousPublications[index] =
        this.data.previousPublications[index + 1];
      this.data.previousPublications[index + 1] = temp;

      this.saveData();
      this.renderPreviousPublications();
      console.log("Previous publication moved down successfully");
    }
  }

  // Data Operations
  updateProjectDescription(description) {
    this.data.projectDescription = description;
    this.saveData();
    this.renderProjectDescription();
    this.closeModal("editDescriptionModal");
    this.showSuccess("Project description updated successfully!");
  }

  editProjectDescriptionSections() {
    // Parse the current description into sections using a simpler approach
    const currentDesc = this.data.projectDescription || "";

    // Split content at key markers
    const visionStart = currentDesc.indexOf('<div class="central-vision">');

    // Extract intro (everything before vision)
    const introHtml =
      visionStart > 0 ? currentDesc.substring(0, visionStart).trim() : "";

    // Extract vision content
    let visionText = "";
    let afterHtml = "";

    if (visionStart >= 0) {
      // Find the end of the vision section by looking for the closing </div> tags
      // The vision section has: <div class="central-vision"><div class="vision-content">...content...</div></div>
      const visionContent = currentDesc.substring(visionStart);
      let divCount = 0;
      let visionEnd = -1;

      for (let i = 0; i < visionContent.length; i++) {
        if (visionContent.substring(i, i + 4) === "<div") {
          divCount++;
        } else if (visionContent.substring(i, i + 6) === "</div>") {
          divCount--;
          if (divCount === 0) {
            visionEnd = visionStart + i + 6;
            break;
          }
        }
      }

      if (visionEnd > 0) {
        const visionSection = currentDesc.substring(visionStart, visionEnd);
        const visionMatch = visionSection.match(
          /<h4[^>]*>.*?<\/h4>\s*<p>(.*?)<\/p>/s,
        );
        visionText = visionMatch ? visionMatch[1] : "";

        // Extract after vision (everything after the complete vision section)
        afterHtml = currentDesc.substring(visionEnd).trim();
      }
    }

    // Convert HTML to markdown-style for editing
    const introText = this.htmlToMarkdown(introHtml);
    const visionTextMarkdown = this.htmlToMarkdown(visionText);
    const afterVisionText = this.htmlToMarkdown(afterHtml);

    // Create and show the sectioned edit modal
    const modalHtml = `
      <div id="editDescriptionSectionsModal" class="modal">
        <div class="modal-content large">
          <div class="modal-header">
            <h3>Edit Project Description</h3>
            <button class="modal-close" onclick="wiki.closeModal('editDescriptionSectionsModal')">&times;</button>
          </div>
          <div class="modal-body">
            <div class="formatting-help">
              <small><strong>Formatting:</strong> Use *bold text* for bold, and start lines with "- " for bullet points</small>
            </div>
            <form id="descriptionSectionsForm">
              <div class="form-group">
                <label for="introText">Introduction Text:</label>
                <textarea id="introText" name="introText" rows="4" class="form-control" placeholder="Introduction paragraph...">${introText}</textarea>
              </div>
              <div class="form-group">
                <label for="visionText">Central Vision Text:</label>
                <textarea id="visionText" name="visionText" rows="3" class="form-control" placeholder="The ultimate goal...">${visionTextMarkdown}</textarea>
              </div>
              <div class="form-group">
                <label for="afterVisionText">Content After Vision:</label>
                <textarea id="afterVisionText" name="afterVisionText" rows="8" class="form-control" placeholder="Additional content...">${afterVisionText}</textarea>
                <small class="form-text text-muted">Tip: Use "- " at the start of lines to create bullet lists with the same styling as the feature list</small>
              </div>
              <div class="form-actions">
                <button type="button" onclick="wiki.closeModal('editDescriptionSectionsModal')" class="btn btn-secondary">Cancel</button>
                <button type="submit" class="btn btn-primary">Update Description</button>
              </div>
            </form>
          </div>
        </div>
      </div>`;

    document.body.insertAdjacentHTML("beforeend", modalHtml);
    this.showModal("editDescriptionSectionsModal");

    // Handle form submission
    document
      .getElementById("descriptionSectionsForm")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        this.updateProjectDescriptionSections(
          formData.get("introText"),
          formData.get("visionText"),
          formData.get("afterVisionText"),
        );
      });
  }

  updateProjectDescriptionSections(introText, visionText, afterVisionText) {
    // Convert markdown-style formatting to HTML
    const processedIntro = this.markdownToHtml(introText);
    const processedVision = this.markdownToHtml(visionText);
    const processedAfter = this.markdownToHtml(afterVisionText);

    // Reconstruct the HTML with proper formatting
    const newDescription = `${processedIntro}

<div class="central-vision">
  <div class="vision-content">
    <h4><i class="fas fa-bullseye"></i> Central Vision</h4>
    <p>${processedVision}</p>
  </div>
</div>

${processedAfter}`;

    this.data.projectDescription = newDescription;
    this.saveData();
    this.renderProjectDescription();
    this.closeModal("editDescriptionSectionsModal");
    this.showSuccess("Project description updated successfully!");
  }

  // Convert HTML to markdown-style formatting for editing
  htmlToMarkdown(html) {
    if (!html) return "";

    return (
      html
        // Remove any stray closing divs
        .replace(/<\/div>/g, "")
        // Convert bold text
        .replace(/<strong>(.*?)<\/strong>/g, "*$1*")
        // Convert paragraphs
        .replace(/<p>/g, "")
        .replace(/<\/p>/g, "\n\n")
        // Convert list items with bold labels
        .replace(/<li><strong>(.*?):<\/strong>(.*?)<\/li>/g, "- *$1:*$2")
        .replace(/<li><strong>(.*?)<\/strong>(.*?)<\/li>/g, "- *$1*$2")
        .replace(/<li>(.*?)<\/li>/g, "- $1")
        // Remove list tags
        .replace(/<ul[^>]*>/g, "")
        .replace(/<\/ul>/g, "")
        // Clean up extra whitespace
        .replace(/\n\s*\n\s*\n/g, "\n\n")
        .replace(/^\s+|\s+$/g, "")
        .trim()
    );
  }

  // Convert markdown-style formatting to HTML
  markdownToHtml(text) {
    if (!text) return "";

    let html = text.trim();

    // Handle bold formatting
    html = html.replace(/\*([^*]+)\*/g, "<strong>$1</strong>");

    // Handle bullet lists
    const lines = html.split("\n");
    let result = [];
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith("- ")) {
        if (!inList) {
          result.push('<ul class="feature-list">');
          inList = true;
        }
        result.push(`<li>${line.substring(2)}</li>`);
      } else {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        if (line) {
          result.push(`<p>${line}</p>`);
        }
      }
    }

    if (inList) {
      result.push("</ul>");
    }

    // Join with appropriate spacing - no extra line breaks in lists
    let finalHtml = result.join("\n\n");

    // Remove extra line breaks within lists
    finalHtml = finalHtml.replace(/(<\/li>)\n\n(<li>)/g, "$1\n$2");
    finalHtml = finalHtml.replace(/(<ul[^>]*>)\n\n(<li>)/g, "$1\n$2");
    finalHtml = finalHtml.replace(/(<\/li>)\n\n(<\/ul>)/g, "$1\n$2");

    return finalHtml;
  }

  saveMember() {
    const formData = new FormData(document.getElementById("memberForm"));
    const memberData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate") || "",
      website: formData.get("website") || "",
      role: formData.get("role"),
    };

    if (this.currentEditingMember) {
      // Update existing member
      const index = this.data.members.findIndex(
        (m) => m.id === this.currentEditingMember,
      );
      this.data.members[index] = { ...this.data.members[index], ...memberData };
    } else {
      // Add new member
      memberData.id = Date.now();
      this.data.members.push(memberData);
    }

    this.saveData();
    this.renderTeamMembers();
    this.closeModal("memberModal");
    this.showSuccess("Team member saved successfully!");
  }

  editMember(id) {
    const member = this.data.members.find((m) => m.id === id);
    if (!member) return;

    this.currentEditingMember = id;
    document.getElementById("firstName").value = member.firstName;
    document.getElementById("lastName").value = member.lastName;
    document.getElementById("startDate").value = member.startDate;
    document.getElementById("endDate").value = member.endDate;
    document.getElementById("website").value = member.website;
    document.getElementById("role").value = member.role || "";

    document.getElementById("memberModalTitle").textContent =
      "Edit Team Member";
    this.showModal("memberModal");
  }

  deleteMember(id) {
    if (confirm("Are you sure you want to delete this team member?")) {
      this.data.members = this.data.members.filter((m) => m.id !== id);
      this.saveData();
      this.renderTeamMembers();
      this.showSuccess("Team member deleted successfully!");
    }
  }

  savePublication() {
    const formData = new FormData(document.getElementById("publicationForm"));
    const selectedWPs = Array.from(formData.getAll("workPackages"));
    const publicationData = {
      title: formData.get("title"),
      authors: formData.get("authors"),
      venue: formData.get("venue"),
      workPackages: selectedWPs,
      description: formData.get("description") || "",
    };

    if (this.currentEditingPublication) {
      // Update existing publication
      const index = this.data.publications.findIndex(
        (p) => p.id === this.currentEditingPublication,
      );
      this.data.publications[index] = {
        ...this.data.publications[index],
        ...publicationData,
      };
    } else if (this.currentEditingPreviousPublication) {
      // Update existing previous publication
      const index = this.data.previousPublications.findIndex(
        (p) => p.id === this.currentEditingPreviousPublication,
      );
      this.data.previousPublications[index] = {
        ...this.data.previousPublications[index],
        ...publicationData,
      };
    } else {
      // Add new publication - determine which list based on modal title
      publicationData.id = Date.now();
      const modalTitle = document.getElementById(
        "publicationModalTitle",
      ).textContent;
      if (modalTitle.includes("Previous")) {
        this.data.previousPublications.unshift(publicationData);
      } else {
        this.data.publications.unshift(publicationData);
      }
    }

    this.saveData();

    if (this.currentEditingPreviousPublication) {
      this.renderPreviousPublications();
    } else {
      this.renderPublications();
    }

    // Update work package publications if we're on a research goal detail page
    this.updateWorkPackagePublications();

    this.closeModal("publicationModal");
    this.showSuccess("Publication saved successfully!");
  }

  editPublication(id) {
    const publication = this.data.publications.find((p) => p.id === id);
    if (!publication) return;

    this.currentEditingPublication = id;
    document.getElementById("title").value = publication.title;
    document.getElementById("authors").value = publication.authors;
    document.getElementById("venue").value = publication.venue;
    document.getElementById("description").value = publication.description;

    // Set work package checkboxes
    const checkboxes = document.querySelectorAll('input[name="workPackages"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked =
        publication.workPackages &&
        publication.workPackages.includes(checkbox.value);
    });

    document.getElementById("publicationModalTitle").textContent =
      "Edit Publication";
    this.showModal("publicationModal");
  }

  editPreviousPublication(id) {
    const publication = this.data.previousPublications.find((p) => p.id === id);
    if (!publication) return;

    this.currentEditingPreviousPublication = id;
    this.currentEditingPublication = null;
    document.getElementById("title").value = publication.title;
    document.getElementById("authors").value = publication.authors;
    document.getElementById("venue").value = publication.venue;
    document.getElementById("description").value = publication.description;

    // Set work package checkboxes
    const checkboxes = document.querySelectorAll('input[name="workPackages"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked =
        publication.workPackages &&
        publication.workPackages.includes(checkbox.value);
    });

    document.getElementById("publicationModalTitle").textContent =
      "Edit Previous Publication";
    this.showModal("publicationModal");
  }

  deletePublication(id) {
    if (confirm("Are you sure you want to delete this publication?")) {
      this.data.publications = this.data.publications.filter(
        (p) => p.id !== id,
      );
      this.saveData();
      this.renderPublications();
      this.updateWorkPackagePublications();
      this.showSuccess("Publication deleted successfully!");
    }
  }

  deletePreviousPublication(id) {
    if (confirm("Are you sure you want to delete this previous publication?")) {
      this.data.previousPublications = this.data.previousPublications.filter(
        (p) => p.id !== id,
      );
      this.saveData();
      this.renderPreviousPublications();
      this.updateWorkPackagePublications();
      this.showSuccess("Previous publication deleted successfully!");
    }
  }

  // Drag and drop handlers (now handled inline in setupDragAndDrop)

  showResearchGoalDetail(wpType) {
    const detailContent = this.getResearchGoalDetailContent(wpType);

    // Create or update the detail section
    let detailSection = document.getElementById(`rg-detail-${wpType}`);
    if (!detailSection) {
      detailSection = document.createElement("section");
      detailSection.id = `rg-detail-${wpType}`;
      detailSection.className = "content-section rg-detail";
      document.querySelector(".container").appendChild(detailSection);
    }

    detailSection.innerHTML = detailContent;

    // Show the detail section
    document.querySelectorAll(".content-section").forEach((section) => {
      section.classList.remove("active");
    });
    detailSection.classList.add("active");

    // Update navigation (no active nav link for detail pages)
    document
      .querySelectorAll(".nav-link")
      .forEach((l) => l.classList.remove("active"));

    // Save page state
    this.savePageState(`rg-detail-${wpType}`);
  }

  getResearchGoalDetailContent(wpType) {
    const goal = this.data.researchGoals[wpType];
    if (!goal) return "<p>Research goal details not found.</p>";

    let workPackagesHtml = goal.workPackages
      .map(
        (wp) => `
      <div class="work-package-detail">
        <div class="wp-header">
          <h4>${wp.title}</h4>
          <div class="admin-only wp-admin-controls">
            <button class="btn btn-small btn-primary" onclick="wiki.editWorkPackage('${wpType}', '${wp.id}')" title="Edit Work Package">
              <i class="fas fa-edit"></i>
            </button>
          </div>
        </div>
        <p class="wp-description">${wp.description}</p>
        <div class="progress-container">
          <div class="progress-label">Progress: ${this.data.progress[wp.id] || 0}%</div>
          <div class="progress-bar" data-wp="${wp.id}" style="--progress-width: ${this.data.progress[wp.id] || 0}%; --progress-color: ${this.getProgressColor(this.data.progress[wp.id] || 0)}">
          </div>
          <div class="admin-only progress-controls" data-wp="${wp.id}">
            <input type="number" min="0" max="100" value="${this.data.progress[wp.id] || 0}" class="progress-input" id="progress-input-${wp.id}">
            <button class="btn btn-small btn-primary" onclick="wiki.updateProgressFromInput('${wp.id}')">Apply</button>
          </div>
        </div>
        <div class="key-questions">
          <div class="questions-header">
            <h5>Key Research Questions:</h5>
            <div class="admin-only questions-admin-controls">
              <button class="btn btn-small btn-primary" onclick="wiki.addResearchQuestion('${wpType}', '${wp.id}')" title="Add Question">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <ul class="research-questions">
            ${wp.questions
              .map(
                (q, index) => `
              <li>
                ${q}
                <div class="admin-only question-controls">
                  <button class="btn btn-icon btn-small btn-primary" onclick="wiki.editResearchQuestion('${wpType}', '${wp.id}', ${index})" title="Edit">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-icon btn-small btn-tertiary" onclick="wiki.deleteResearchQuestion('${wpType}', '${wp.id}', ${index})" title="Delete">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </li>
            `,
              )
              .join("")}
          </ul>
        </div>
        <div class="wp-publications">
          <div class="wp-publications-header" onclick="wiki.toggleWpPublications('${wp.id}')">
            <i class="fas fa-chevron-right wp-publications-toggle" id="toggle-${wp.id}"></i>
            <h5>Related Publications</h5>
          </div>
          <div class="wp-publications-list collapsed" id="publications-${wp.id}">
            ${this.getWorkPackagePublications(wp.id)}
          </div>
        </div>
        <div class="wp-remarks">
          <div class="wp-remarks-header" onclick="wiki.toggleWpRemarks('${wp.id}')">
            <i class="fas fa-chevron-right wp-remarks-toggle" id="remarks-toggle-${wp.id}"></i>
            <h5>Remarks</h5>
            <div class="admin-only remarks-admin-controls">
              <button class="btn btn-small btn-primary" onclick="wiki.editWorkPackageRemarks('${wpType}', '${wp.id}')" title="Edit Remarks">
                <i class="fas fa-edit"></i>
              </button>
            </div>
          </div>
          <div class="wp-remarks-content collapsed" id="remarks-${wp.id}">
            <div class="wp-remarks-text">${this.getWorkPackageRemarks(wp.id)}</div>
          </div>
        </div>
      </div>
    `,
      )
      .join("");

    return `
      <div class="rg-detail-header">
        <div class="rg-detail-nav">
          <button onclick="wiki.showSection('overview')" class="btn btn-link">
            <i class="fas fa-arrow-left"></i> Back to Overview
          </button>
        </div>
        <h2>${goal.title}</h2>
        <div class="admin-only title-admin-controls">
          <button class="btn btn-small btn-primary" onclick="wiki.editResearchGoalTitle('${wpType}')" title="Edit Title">
            <i class="fas fa-edit"></i>
          </button>
        </div>
        <p class="rg-subtitle">${goal.subtitle}</p>
      </div>

      <div class="rg-description">
        <p>${goal.description}</p>
        <div class="admin-only description-admin-controls">
          <button class="btn btn-small btn-primary" onclick="wiki.editResearchGoalDescription('${wpType}')" title="Edit Description">
            <i class="fas fa-edit"></i>
          </button>
        </div>
      </div>

      <div class="rg-detail-content">
        <div class="rg-overview">
          <h3>Overview</h3>
          <p>${goal.description}</p>
          <div class="rg-detail-actions">
            <button onclick="wiki.showSection('publications'); setTimeout(() => wiki.filterPublications('${wpType}'), 100);" class="btn btn-primary">
              <i class="fas fa-book"></i> View All Related Publications
            </button>
            <button onclick="wiki.showSection('overview')" class="btn btn-secondary">
              <i class="fas fa-home"></i> Return to Overview
            </button>
          </div>
        </div>

        <div class="work-packages-detail">
          <h3>Work Packages & Key Questions</h3>
          ${workPackagesHtml}
        </div>
      </div>
    `;

    // Setup input controls for progress bars
    setTimeout(() => {
      this.setupProgressInputs();
    }, 100);
  }

  // Research Goal Editing Functions
  editResearchGoalTitle(wpType) {
    const goal = this.data.researchGoals[wpType];
    if (!goal) return;

    const newTitle = prompt("Edit Research Goal Title:", goal.title);
    if (newTitle && newTitle.trim() && newTitle !== goal.title) {
      goal.title = newTitle.trim();
      this.saveData();
      this.showResearchGoalDetail(wpType);
      this.showSuccess("Research goal title updated successfully!");
    }
  }

  editResearchGoalDescription(wpType) {
    const goal = this.data.researchGoals[wpType];
    if (!goal) return;

    const newDescription = prompt(
      "Edit Research Goal Description:",
      goal.description,
    );
    if (
      newDescription &&
      newDescription.trim() &&
      newDescription !== goal.description
    ) {
      goal.description = newDescription.trim();
      this.saveData();
      this.showResearchGoalDetail(wpType);
      this.showSuccess("Research goal description updated successfully!");
    }
  }

  editWorkPackage(goalType, wpId) {
    const goal = this.data.researchGoals[goalType];
    if (!goal) return;

    const workPackage = goal.workPackages.find((wp) => wp.id === wpId);
    if (!workPackage) return;

    const newTitle = prompt("Edit Work Package Title:", workPackage.title);
    if (newTitle && newTitle.trim() && newTitle !== workPackage.title) {
      workPackage.title = newTitle.trim();

      const newDescription = prompt(
        "Edit Work Package Description:",
        workPackage.description,
      );
      if (
        newDescription &&
        newDescription.trim() &&
        newDescription !== workPackage.description
      ) {
        workPackage.description = newDescription.trim();
      }

      this.saveData();
      this.showResearchGoalDetail(goalType);
      this.showSuccess("Work package updated successfully!");
    }
  }

  addResearchQuestion(goalType, wpId) {
    const goal = this.data.researchGoals[goalType];
    if (!goal) return;

    const workPackage = goal.workPackages.find((wp) => wp.id === wpId);
    if (!workPackage) return;

    const newQuestion = prompt("Enter new research question:");
    if (newQuestion && newQuestion.trim()) {
      workPackage.questions.push(newQuestion.trim());
      this.saveData();
      this.showResearchGoalDetail(goalType);
      this.showSuccess("Research question added successfully!");
    }
  }

  editResearchQuestion(goalType, wpId, questionIndex) {
    const goal = this.data.researchGoals[goalType];
    if (!goal) return;

    const workPackage = goal.workPackages.find((wp) => wp.id === wpId);
    if (!workPackage || !workPackage.questions[questionIndex]) return;

    const currentQuestion = workPackage.questions[questionIndex];
    const newQuestion = prompt("Edit research question:", currentQuestion);
    if (newQuestion && newQuestion.trim() && newQuestion !== currentQuestion) {
      workPackage.questions[questionIndex] = newQuestion.trim();
      this.saveData();
      this.showResearchGoalDetail(goalType);
      this.showSuccess("Research question updated successfully!");
    }
  }

  deleteResearchQuestion(goalType, wpId, questionIndex) {
    const goal = this.data.researchGoals[goalType];
    if (!goal) return;

    const workPackage = goal.workPackages.find((wp) => wp.id === wpId);
    if (!workPackage || !workPackage.questions[questionIndex]) return;

    if (confirm("Are you sure you want to delete this research question?")) {
      workPackage.questions.splice(questionIndex, 1);
      this.saveData();
      this.showResearchGoalDetail(goalType);
      this.showSuccess("Research question deleted successfully!");
    }
  }

  getWorkPackagePublications(wpId) {
    // Get publications from both current and previous publications
    const currentPubs = this.data.publications.filter(
      (pub) => pub.workPackages && pub.workPackages.includes(wpId),
    );
    const previousPubs = this.data.previousPublications.filter(
      (pub) => pub.workPackages && pub.workPackages.includes(wpId),
    );

    const allPubs = [...currentPubs, ...previousPubs];

    if (allPubs.length === 0) {
      return '<p class="no-publications">No publications directly target this work package yet.</p>';
    }

    return allPubs
      .map(
        (pub) => `
      <div class="wp-pub-item">
        <div class="wp-pub-title">${pub.title}</div>
        <div class="wp-pub-authors">${pub.authors}</div>
        <div class="wp-pub-venue">${pub.venue}</div>
      </div>
    `,
      )
      .join("");
  }

  toggleWpPublications(wpId) {
    const list = document.getElementById(`publications-${wpId}`);
    const toggle = document.getElementById(`toggle-${wpId}`);

    if (list.classList.contains("collapsed")) {
      list.classList.remove("collapsed");
      toggle.classList.remove("fa-chevron-right");
      toggle.classList.add("fa-chevron-down");
    } else {
      list.classList.add("collapsed");
      toggle.classList.remove("fa-chevron-down");
      toggle.classList.add("fa-chevron-right");
    }
  }

  toggleWpRemarks(wpId) {
    const content = document.getElementById(`remarks-${wpId}`);
    const toggle = document.getElementById(`remarks-toggle-${wpId}`);

    if (content.classList.contains("collapsed")) {
      content.classList.remove("collapsed");
      toggle.classList.remove("fa-chevron-right");
      toggle.classList.add("fa-chevron-down");
    } else {
      content.classList.add("collapsed");
      toggle.classList.remove("fa-chevron-down");
      toggle.classList.add("fa-chevron-right");
    }
  }

  updateWorkPackagePublications() {
    const wpPublicationsLists = document.querySelectorAll(
      ".wp-publications-list",
    );
    wpPublicationsLists.forEach((list) => {
      const wpId = list.id.replace("publications-", "");
      list.innerHTML = this.getWorkPackagePublications(wpId);
    });
  }

  getWorkPackageRemarks(wpId) {
    const remarks = this.data.workPackageRemarks[wpId];
    if (!remarks || remarks.trim() === "") {
      return '<p class="no-remarks">No remarks yet.</p>';
    }
    return `<div class="remarks-content">${remarks}</div>`;
  }

  editWorkPackageRemarks(wpType, wpId) {
    const currentRemarks = this.data.workPackageRemarks[wpId] || "";

    const modalHtml = `
      <div id="editRemarksModal" class="modal">
        <div class="modal-content large">
          <div class="modal-header">
            <h3>Edit Work Package Remarks</h3>
            <button class="modal-close" onclick="wiki.closeModal('editRemarksModal')">&times;</button>
          </div>
          <div class="modal-body">
            <div class="formatting-help">
              <small><strong>Formatting:</strong> Use *bold text* for bold formatting</small>
            </div>
            <form id="remarksForm">
              <div class="form-group">
                <label for="remarksText">Remarks:</label>
                <textarea id="remarksText" name="remarksText" rows="8" class="form-control" placeholder="Add comments about achievements, follow-up works, research progress, etc...">${currentRemarks.replace(/<[^>]*>/g, "").replace(/\*([^*]+)\*/g, "*$1*")}</textarea>
                <small class="form-text text-muted">Share insights about what has been achieved, mention follow-up works by others, comment on research progress, etc.</small>
              </div>
              <div class="form-actions">
                <button type="button" onclick="wiki.closeModal('editRemarksModal')" class="btn btn-secondary">Cancel</button>
                <button type="submit" class="btn btn-primary">Save Remarks</button>
              </div>
            </form>
          </div>
        </div>
      </div>`;

    document.body.insertAdjacentHTML("beforeend", modalHtml);
    this.showModal("editRemarksModal");

    document.getElementById("remarksForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const remarksText = document.getElementById("remarksText").value.trim();
      this.updateWorkPackageRemarks(wpId, remarksText);
    });
  }

  updateWorkPackageRemarks(wpId, remarksText) {
    // Convert markdown-style formatting to HTML
    const processedRemarks = this.markdownToHtml(remarksText);

    this.data.workPackageRemarks[wpId] = processedRemarks;
    this.saveData();

    // Update the display
    const remarksContainer = document.getElementById(`remarks-${wpId}`);
    if (remarksContainer) {
      const textContainer = remarksContainer.querySelector(".wp-remarks-text");
      if (textContainer) {
        textContainer.innerHTML = this.getWorkPackageRemarks(wpId);
      }
    }

    this.closeModal("editRemarksModal");
    this.showSuccess("Work package remarks updated successfully!");
  }

  // Utilities
  resetMemberForm() {
    document.getElementById("memberForm").reset();
  }

  resetPublicationForm() {
    document.getElementById("publicationForm").reset();
    this.currentEditingPublication = null;
    this.currentEditingPreviousPublication = null;
  }

  formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  }

  filterPublications(filter) {
    // Re-render publications with the filter applied
    this.renderPublications(filter);

    // Also re-render previous publications with the same filter
    this.renderPreviousPublications(filter);

    // Update active filter button - handle both main and sub-filter buttons
    const isSubFilter = filter.includes("-") && filter !== "all";

    if (!isSubFilter) {
      // Main filter selected - update main buttons and show sub-filters
      document
        .querySelectorAll(".filter-btn:not(.sub-filter-btn)")
        .forEach((b) => b.classList.remove("active"));
      const filterBtn = document.querySelector(
        `[data-filter="${filter}"]:not(.sub-filter-btn)`,
      );
      if (filterBtn) {
        filterBtn.classList.add("active");
      }
      this.updateWorkPackageFilters(filter);
    } else {
      // Sub-filter selected - just update sub-filter buttons
      document
        .querySelectorAll(".sub-filter-btn")
        .forEach((b) => b.classList.remove("active"));
      const filterBtn = document.querySelector(
        `[data-filter="${filter}"].sub-filter-btn`,
      );
      if (filterBtn) {
        filterBtn.classList.add("active");
      }
    }
  }

  updateWorkPackageFilters(filter) {
    let subFilters = document.querySelector(".wp-sub-filters");

    // Remove existing sub-filters
    if (subFilters) {
      subFilters.remove();
    }

    // Only show sub-filters for specific research goals
    if (filter === "rg1" || filter === "rg2" || filter === "rg3") {
      const filtersContainer = document.querySelector(".publications-filters");

      // Create sub-filters container
      subFilters = document.createElement("div");
      subFilters.className = "wp-sub-filters";

      let subFilterButtons = "";

      if (filter === "rg1") {
        subFilterButtons = `
          <button class="filter-btn sub-filter-btn" data-filter="rg1-specific">RG1: Specific</button>
          <button class="filter-btn sub-filter-btn" data-filter="rg1-ole">RG1: OLE</button>
          <button class="filter-btn sub-filter-btn" data-filter="rg1-unbounded">RG1: Unbounded</button>
          <button class="filter-btn sub-filter-btn" data-filter="rg1-multiparty">RG1: Multiparty</button>
        `;
      } else if (filter === "rg2") {
        subFilterButtons = `
          <button class="filter-btn sub-filter-btn" data-filter="rg2-nisp">RG2: NISP</button>
          <button class="filter-btn sub-filter-btn" data-filter="rg2-nizk">RG2: NIZK</button>
          <button class="filter-btn sub-filter-btn" data-filter="rg2-foundations">RG2: Foundations</button>
        `;
      } else if (filter === "rg3") {
        subFilterButtons = `
          <button class="filter-btn sub-filter-btn" data-filter="rg3-multiparty">RG3: Multiparty</button>
          <button class="filter-btn sub-filter-btn" data-filter="rg3-general">RG3: General</button>
          <button class="filter-btn sub-filter-btn" data-filter="rg3-barriers">RG3: Barriers</button>
        `;
      }

      subFilters.innerHTML = subFilterButtons;
      filtersContainer.parentNode.insertBefore(
        subFilters,
        filtersContainer.nextSibling,
      );

      // Add event listeners to sub-filter buttons
      subFilters.querySelectorAll(".sub-filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          this.filterPublications(btn.dataset.filter);
        });
      });
    }
  }

  filterPreviousPublications(filter) {
    // Re-render previous publications with the filter applied
    this.renderPreviousPublications(filter);

    // Update active filter button
    document
      .querySelectorAll(".filter-btn-prev")
      .forEach((b) => b.classList.remove("active"));
    const filterBtn = document.querySelector(
      `[data-filter="${filter}"].filter-btn-prev`,
    );
    if (filterBtn) {
      filterBtn.classList.add("active");
    }
  }

  getFilteredPublications(filter = null) {
    if (!filter) {
      const activeFilter = document.querySelector(".filter-btn.active");
      filter = activeFilter ? activeFilter.dataset.filter : "all";
    }

    if (filter === "all") {
      return this.data.publications;
    }

    return this.data.publications.filter(
      (pub) =>
        pub.workPackages &&
        pub.workPackages.some(
          (wp) =>
            wp.startsWith(filter) ||
            (filter === "rg1" && wp.startsWith("rg1-")) ||
            (filter === "rg2" && wp.startsWith("rg2-")) ||
            (filter === "rg3" && wp.startsWith("rg3-")),
        ),
    );
  }

  getFilteredPreviousPublications(filter = null) {
    if (!filter) {
      // Check if there's an active filter in the main publications section first
      const activeMainFilter = document.querySelector(".filter-btn.active");
      if (activeMainFilter && activeMainFilter.dataset.filter !== "all") {
        filter = activeMainFilter.dataset.filter;
      } else {
        // Fall back to previous publications filter
        const activeFilter = document.querySelector(".filter-btn-prev.active");
        filter = activeFilter ? activeFilter.dataset.filter : "all";
      }
    }

    if (filter === "all") {
      return this.data.previousPublications;
    }

    return this.data.previousPublications.filter(
      (pub) =>
        pub.workPackages &&
        pub.workPackages.some(
          (wp) =>
            wp.startsWith(filter) ||
            (filter === "rg1" && wp.startsWith("rg1-")) ||
            (filter === "rg2" && wp.startsWith("rg2-")) ||
            (filter === "rg3" && wp.startsWith("rg3-")),
        ),
    );
  }

  showMemberPublications(memberId) {
    const member = this.data.members.find((m) => m.id === memberId);
    if (!member) return;

    const memberName = `${member.firstName} ${member.lastName}`;
    const memberPubs = this.data.publications.filter(
      (pub) =>
        pub.authors.toLowerCase().includes(member.firstName.toLowerCase()) ||
        pub.authors.toLowerCase().includes(member.lastName.toLowerCase()) ||
        pub.authors.toLowerCase().includes(memberName.toLowerCase()),
    );

    // Switch to publications section
    this.showSection("publications");

    // Add member filter indicator
    const sectionHeader = document.querySelector(
      "#publications .section-header h2",
    );
    sectionHeader.innerHTML = `Publications of ${memberName} associated to the project`;

    // Hide filter buttons when showing member publications
    const filtersContainer = document.querySelector(".publications-filters");
    if (filtersContainer) {
      filtersContainer.style.display = "none";
    }

    // Also hide work package sub-filters if they exist
    const subFilters = document.querySelector(".wp-sub-filters");
    if (subFilters) {
      subFilters.style.display = "none";
    }

    // Filter publications
    const container = document.getElementById("publicationsList");
    const allPubs = container.querySelectorAll(".publication");

    allPubs.forEach((pub) => {
      const pubId = parseInt(pub.dataset.id);
      const isMatch = memberPubs.some((mp) => mp.id === pubId);
      pub.style.display = isMatch ? "block" : "none";
    });

    // Update previous publications header
    const prevSectionHeader = document.querySelector(
      "#publications .section-header:last-of-type h2",
    );
    if (prevSectionHeader) {
      prevSectionHeader.innerHTML = `Previous Publications of ${memberName}`;
    }

    // Also filter previous publications to show only this member's publications
    this.renderPreviousPublications();
    const prevContainer = document.getElementById("previousPublicationsList");
    const allPrevPubs = prevContainer.querySelectorAll(".publication");

    allPrevPubs.forEach((pub) => {
      const publication = this.data.previousPublications.find(
        (p) => p.id === parseInt(pub.dataset.id),
      );
      if (publication) {
        const isMatch =
          publication.authors
            .toLowerCase()
            .includes(member.firstName.toLowerCase()) ||
          publication.authors
            .toLowerCase()
            .includes(member.lastName.toLowerCase()) ||
          publication.authors.toLowerCase().includes(memberName.toLowerCase());
        pub.style.display = isMatch ? "block" : "none";
      }
    });

    // Update filter display
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));

    // Store that we're in member filter mode
    this.currentMemberFilter = memberId;

    // Show error if no publications found
    if (memberPubs.length === 0) {
      this.showError(`No publications found for ${memberName}`);
    }
  }

  resetPublicationsView() {
    // Reset the section header
    const sectionHeader = document.querySelector(
      "#publications .section-header h2",
    );
    sectionHeader.innerHTML = "Publications associated to the project";

    // Reset previous publications header
    const prevSectionHeader = document.querySelector(
      "#publications .section-header:last-of-type h2",
    );
    if (prevSectionHeader) {
      prevSectionHeader.innerHTML = "Previous Publications";
    }

    // Show filter buttons again
    const filtersContainer = document.querySelector(".publications-filters");
    if (filtersContainer) {
      filtersContainer.style.display = "flex";
    }

    // Hide work package sub-filters
    const subFilters = document.querySelector(".wp-sub-filters");
    if (subFilters) {
      subFilters.style.display = "none";
    }

    // Clear member filter
    this.currentMemberFilter = null;

    // Reset to show all publications
    this.filterPublications("all");

    // Also reset previous publications display
    this.renderPreviousPublications("all");

    // Make sure "All" filter button is active
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn) {
      allBtn.classList.add("active");
    }
  }

  getRoleName(role) {
    const roleNames = {
      PI: "Principal Investigator",
      postdoc: "Postdoc",
      phd: "PhD Student",
      master: "Master Student",
    };
    return roleNames[role] || role;
  }

  getWorkPackageName(wp) {
    const wpNames = {
      rg1: "RG1: Silent Preprocessing",
      "rg1-specific": "RG1: Specific functions",
      "rg1-ole": "RG1: OLE correlations",
      "rg1-unbounded": "RG1: Unbounded preprocessing",
      "rg1-multiparty": "RG1: Multiparty preprocessing",
      rg2: "RG2: Non-Interactive Protocols",
      "rg2-nisp": "RG2: Non-interactive silent preprocessing",
      "rg2-nizk": "RG2: Efficient NIZKs",
      "rg2-foundations": "RG2: Theoretical foundations",
      rg3: "RG3: Low Communication",
      "rg3-multiparty": "RG3: Multiparty protocols",
      "rg3-general": "RG3: General circuits",
      "rg3-barriers": "RG3: Breaking barriers",
    };
    return wpNames[wp] || wp;
  }

  getProgressColor(percentage) {
    if (percentage < 25) {
      return "#e74c3c"; // Red
    } else if (percentage < 50) {
      return "#f39c12"; // Orange
    } else if (percentage < 75) {
      return "#f1c40f"; // Yellow
    } else {
      return "#27ae60"; // Green
    }
  }

  setProgress(wpId, percentage) {
    if (!this.data.progress) {
      this.data.progress = {};
    }
    this.data.progress[wpId] = percentage;
    this.saveData();
    this.renderResearchGoalDetail();
  }

  setupProgressBar(wpId, container) {
    const progress = this.data.progress[wpId] || 0;

    const progressHtml = `
      <div class="progress-container">
        <div class="progress-label">Progress: ${progress}%</div>
        <div class="progress-bar" data-wp="${wpId}" style="--progress-width: ${progress}%; --progress-color: ${this.getProgressColor(progress)}">
        </div>
        <div class="admin-only progress-controls" data-wp="${wpId}">
          <input type="number" min="0" max="100" value="${progress}" class="progress-input" id="progress-input-${wpId}">
          <button class="btn btn-small btn-primary" onclick="wiki.updateProgressFromInput('${wpId}')">Apply</button>
        </div>
      </div>
    `;

    container.innerHTML += progressHtml;

    // Progress bars now use input controls instead of drag interaction
  }

  updateProgressFromInput(wpId) {
    const input = document.getElementById(`progress-input-${wpId}`);
    if (!input) return;

    const value = parseInt(input.value);
    if (isNaN(value) || value < 0 || value > 100) {
      this.showError("Please enter a valid number between 0 and 100");
      return;
    }

    this.updateProgress(wpId, value);
    this.showSuccess(`Progress updated to ${value}%`);
  }

  setupProgressInputs() {
    // Add Enter key support to all progress inputs
    const inputs = document.querySelectorAll(".progress-input");
    inputs.forEach((input) => {
      if (input._hasEnterListener) return;

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const wpId = input.id.replace("progress-input-", "");
          this.updateProgressFromInput(wpId);
        }
      });
      input._hasEnterListener = true;
    });
  }

  updateProgress(wpId, percentage) {
    this.data.progress[wpId] = percentage;
    this.saveData();

    // Update all progress bars with this wpId
    const progressBars = document.querySelectorAll(`[data-wp="${wpId}"]`);

    progressBars.forEach((progressBar) => {
      if (!progressBar) return;

      const indicator = progressBar.querySelector(".progress-indicator");
      const label = progressBar.parentElement.querySelector(".progress-label");
      const percentageDisplay = progressBar.parentElement.querySelector(
        ".progress-percentage",
      );

      // Update CSS custom property for the progress width and color
      progressBar.style.setProperty("--progress-width", percentage + "%");
      progressBar.style.setProperty(
        "--progress-color",
        this.getProgressColor(percentage),
      );

      if (label) {
        label.textContent = `Progress: ${percentage}%`;
      }

      // Update the input value if it exists
      const input = document.getElementById(`progress-input-${wpId}`);
      if (input) {
        input.value = percentage;
      }
    });
  }
}

// Initialize the wiki when DOM is loaded
let wiki;
document.addEventListener("DOMContentLoaded", () => {
  wiki = new OBELiSCWiki();
  wiki.init();
});

// Work package click handlers to show detailed research goal pages
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".work-package").forEach((wp) => {
    wp.addEventListener("click", () => {
      const wpType = wp.dataset.wp;
      wiki.showResearchGoalDetail(wpType);
    });
  });
});
