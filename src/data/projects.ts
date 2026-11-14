import { Project, CountryPerspective } from '../types';

export interface CountryProfile {
  label: string;
  badge: string;
  statusTitle: string;
  summary: string;
  bullets: string[];
}

export const COUNTRY_PROFILES: Record<CountryPerspective, CountryProfile> = {
  international: {
    label: 'International',
    badge: 'Cabinet Maker · Custom Joinery',
    statusTitle: 'Sponsorship & Relocation Readiness',
    summary: `Cabinet maker with 7 years of hands-on experience designing, cutting, assembling, and installing custom kitchen cabinetry, wardrobes, and fitted storage using HDF, MDF, and melamine-faced boards (MFC). Trained at Abuja Enterprise Agency (AEA) in collaboration with Dazzle Furniture Limited, with strong skills in site measurement, cutting list optimization, hardware fitting, and SketchUp 3D layout drafting.`,
    bullets: [
      'Requires employer visa sponsorship',
      'Ready for international relocation',
      'Preparing TRA skills assessment & trade verification'
    ]
  },
  australia: {
    label: 'Australia (ANZSCO 339911)',
    badge: 'ANZSCO 339911 Cabinetmaker',
    statusTitle: 'Australia Sponsorship & Relocation',
    summary: `Qualified Cabinetmaker with 7 years of practical experience in carcass manufacturing, panel sizing, edge-banding, and on-site scribing and fitting for residential kitchens and built-in robes. Trained at Abuja Enterprise Agency (AEA) in collaboration with Dazzle Furniture Limited. Seeking employer visa sponsorship (Subclass 482/186) and preparing TRA Skills Assessment verification.`,
    bullets: [
      'ANZSCO 339911 Cabinetmaker classification',
      'Seeking TSS 482 / Subclass 186 sponsorship',
      'Preparing Trades Recognition Australia (TRA) assessment'
    ]
  },
  uk: {
    label: 'United Kingdom',
    badge: 'SOC 5491 Joiner & Cabinet Maker',
    statusTitle: 'UK Skilled Worker Sponsorship',
    summary: `Fitted Joiner and Cabinet Maker specializing in modular kitchen carcass production, melamine/MDF board fabrication, Blum soft-close hardware integration, and precision architectural joinery installation. Trained at Abuja Enterprise Agency (AEA) in collaboration with Dazzle Furniture Limited. Seeking UK Skilled Worker Visa sponsorship.`,
    bullets: [
      'UK SOC 5491 Skilled Carpenter & Cabinet Maker',
      'Requires UK Skilled Worker Visa sponsorship',
      'Carcass construction & on-site scribing competency'
    ]
  },
  eu: {
    label: 'Germany & Luxembourg',
    badge: 'Tischler / Cabinet Maker',
    statusTitle: 'European Relocation & Skilled Immigration',
    summary: `Fitted Cabinet Maker and Joiner specializing in custom kitchen carcass production, melamine/MDF board fabrication, Blum soft-close hardware integration, and high-precision fitted storage. Trained at Abuja Enterprise Agency (AEA) in collaboration with Dazzle Furniture Limited. Open to EU Blue Card and skilled trades sponsorship.`,
    bullets: [
      'European Tischler / Cabinet Maker trade scope',
      'Open to Luxembourg & Germany sponsorship',
      'Melamine / MDF board processing & custom joinery'
    ]
  }
};

export const CV_DATA = {
  name: 'Eboh Kingsley Uzoma.',
  title: 'Cabinet Maker | Kitchen Cabinetry and Fitted Furniture',
  location: 'Abuja, Nigeria',
  phone: '+234 7032745334',
  email: 'freedommindsetng@gmail.com',
  sponsorship: COUNTRY_PROFILES.international.bullets,
  summary: COUNTRY_PROFILES.international.summary,
  skills: {
    joinery: [
      'Kitchen cabinets: base, wall, tall, pantry and island units',
      'Wardrobes and fitted storage',
      'Carcass construction, door and drawer fitting',
      'Custom storage and corner solutions'
    ],
    materials: [
      'HDF, MDF and MFC board, in high-gloss and matte finishes',
      'Cutting lists, board optimization and material estimates',
      'Edge finishing and cabinet preparation',
      'Working from client briefs, measurements and design specifications'
    ],
    hardware: [
      'Concealed hinges, soft-close systems and drawer runners',
      'Handles, finger-pull profiles and adjustable shelving',
      'On-site installation, leveling, alignment and final adjustments',
      'Planning cabinet layouts around sinks, cooktops, ovens and refrigerators'
    ],
    toolsAndSoftware: [
      'Panel cutting equipment, circular saws, drills and angle grinders',
      'Measuring, squaring and leveling tools',
      'SketchUp: 3D kitchen and furniture design',
      'CorelDRAW and Adobe Creative Suite: layouts and visual communication'
    ]
  },
  primaryExperience: [
    {
      title: 'Independent Cabinet Maker and Furniture Maker',
      company: 'Self-Employed / Private Clients',
      location: 'Nigeria',
      period: '2019 – Present',
      bullets: [
        'Design, build and install custom kitchen cabinets for private clients, from site measure to final handover.',
        'Complete kitchens, wardrobes and fitted-furniture projects.',
        'Convert site measurements and kitchen layouts into accurate cabinet dimensions and cutting lists.',
        'Reduce material waste by optimising board layouts and costs for each job.',
        'Cut, assemble and fit carcasses, doors, drawers and hardware to a consistent standard.',
        'Advise clients on materials, layout, functionality and budget.',
        'Manage installation, alignment and finishing on site.'
      ]
    }
  ],
  additionalExperience: {
    title: 'Technology Tutor',
    company: 'Techxagon Academy',
    location: 'Abuja, Nigeria',
    period: '2024 – Present',
    bullets: [
      'Teach computer studies and Python and Javascript programming fundamentals, webdevelopment (HTML, and CSS ) in secondary schools.',
      'Build skills in planning, documentation and clear communication with clients and colleagues.'
    ],
    tradeStatements: [
      'I have an established trade background.',
      'I have continued practising cabinet making while employed elsewhere.',
      'I am bringing independent project experience into an employee role.'
    ]
  },
  education: [
    {
      title: 'Certificate in Cabinetry and Furniture Making',
      institution: 'Abuja Enterprise Agency (AEA) Abuja, in collaboration with Dazzle Furniture Limited',
      date: 'February 2019'
    },
    {
      title: 'Certificate of Participation in General Entreprenuership Training',
      institution: 'Abuja Enterprise Agency (AEA) Abuja',
      date: 'August 2019'
    }
  ],
  targetRoles: [
    'Cabinet Maker',
    'Kitchen Cabinet Maker',
    'Cabinet Maker/Installer',
    'Furniture Maker',
    'Joinery Workshop Assistant'
  ],
  references: 'Available on request.'
};

export const PROJECTS: Project[] = [
  {
    id: 'workshop-fabrication-sept-2026',
    title: 'Precision Carcass Fabrication & Board Processing',
    category: 'Cabinet Assembly',
    location: 'Abuja Workshop, Nigeria',
    projectType: 'Batch Production & Tool Operation',
    completionDate: '2026',
    summary: 'Panel sizing, circular saw adjustments, and corner unit carcass assembly using moisture-resistant HDF and MFC boards.',
    description: 'Systematic processing of moisture-resistant HDF and MFC boards in the workshop. Utilizing sliding panel saws, table saws, and track-guided circular saws for accurate panel sizing, recutting to site measurements, and corner carcass construction.',
    materials: [
      'High-Density Fiberboard (HDF)',
      'Moisture-Resistant MDF (MR-MDF)',
      'Melamine-Faced Chipboard (MFC)',
      'Impact-resistant edge banding'
    ],
    responsibilities: [
      'Panel sizing on sliding panel and table saws',
      'Precision recutting for site adjustments',
      'Corner unit carcass squaring and reinforcement',
      'Cutting list execution and board optimization'
    ],
    technicalHighlights: [
      'Zero-chip cutting on melamine-faced boards',
      'Diagonal variance within 0.5mm on large carcasses'
    ],
    featuredImage: '/images/projects/pannel saw use.jpg',
    images: [
      {
        url: '/images/projects/pannel saw use.jpg',
        caption: 'Panel saw cutting and board sizing in the workshop'
      },
      {
        url: '/images/projects/saw use2.jpg',
        caption: 'Precision saw operation for custom cabinetry panels'
      },
      {
        url: '/images/projects/cabinet corner units carcass build.jpg',
        caption: 'Assembling corner unit carcasses'
      },
      {
        url: '/images/projects/cabinet corner unit carcass.jpg',
        caption: 'Completed corner carcass build'
      }
    ]
  },
  {
    id: 'drawer-box-fabrication-2026',
    title: 'Kitchen Drawer Box Fabrication & Fitting',
    category: 'Cabinet Assembly',
    location: 'Abuja, Nigeria',
    projectType: 'Drawer Construction & Runner Alignment',
    completionDate: '2026',
    summary: 'Workshop drawer box assembly, runner indexing, and on-site drawer fitting for smooth, level operation.',
    description: 'Building custom kitchen drawer boxes to exact internal carcass clearances, indexing drawer runners, and fitting drawer fronts on site with uniform reveals.',
    materials: [
      '18mm Moisture-Resistant HDF & MDF',
      'Soft-close drawer runners & concealed slides',
      'Confirmat screws and structural wood adhesives'
    ],
    responsibilities: [
      'Cutting and assembling square drawer boxes',
      'Indexing drawer slides and runners',
      'Fitting and aligning drawer units on site'
    ],
    technicalHighlights: [
      'Uniform side clearances and smooth soft-close action',
      'Square diagonal tolerance across multi-drawer stacks'
    ],
    featuredImage: '/images/projects/fitting drwr.jpg',
    images: [
      {
        url: '/images/projects/fitting drwr.jpg',
        caption: 'Fitting drawer boxes and checking alignment'
      },
      {
        url: '/images/projects/drawer box build.jpg',
        caption: 'Drawer box assembly and joinery in progress'
      }
    ]
  },
  {
    id: 'door-island-hardware-install-2026',
    title: 'HDF Door, Island & Hardware Installation',
    category: 'On-site Installation',
    location: 'Abuja, Nigeria',
    projectType: 'Cabinet Door Hanging & Hardware Fitting',
    completionDate: '2026',
    summary: 'On-site installation of HDF cabinet doors, kitchen island units, concealed hinges, and handle hardware.',
    description: 'Final-stage kitchen installation covering HDF door hanging, island cabinet door alignment, hinge adjustment for consistent shadow gaps, and precision drilling and fitting of cabinet handles.',
    materials: [
      '18mm High-Density Fiberboard (HDF) doors',
      'Concealed cup hinges with soft-close dampers',
      'Cabinet handles and mounting hardware'
    ],
    responsibilities: [
      'Hanging and aligning HDF cabinet and island doors',
      'Fine-tuning hinges for even vertical and horizontal reveals',
      'Measuring, templating, and installing cabinet handles'
    ],
    technicalHighlights: [
      'Consistent door shadow gaps across base and island runs',
      'Jig-aligned handle placement across all doors and drawers'
    ],
    featuredImage: '/images/projects/door install.jpg',
    images: [
      {
        url: '/images/projects/door install.jpg',
        caption: 'Installing and aligning kitchen cabinet doors'
      },
      {
        url: '/images/projects/door install2.jpg',
        caption: 'Door hinge adjustment and alignment on site'
      },
      {
        url: '/images/projects/island door install.jpg',
        caption: 'Kitchen island cabinet door fitting'
      },
      {
        url: '/images/projects/handles install.jpg',
        caption: 'Measuring and fitting cabinet handles'
      }
    ]
  }
];

