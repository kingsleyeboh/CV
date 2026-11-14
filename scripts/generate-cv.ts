import { jsPDF } from 'jspdf';
import * as fs from 'fs';
import * as path from 'path';

function generateCV() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Header background banner (dark charcoal)
  doc.setFillColor(24, 24, 27);
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Accent line in Warm Amber
  doc.setFillColor(245, 158, 11);
  doc.rect(0, 42, pageWidth, 2.5, 'F');

  // Candidate Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('EBOH KINGSLEY UZOMA', margin, 16);

  // Candidate Title
  doc.setTextColor(251, 191, 36);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Cabinet Maker | Kitchen Cabinetry and Fitted Furniture', margin, 24);

  // Contact / Location Subtitle
  doc.setTextColor(212, 212, 216);
  doc.setFontSize(8.5);
  doc.text('Abuja, Nigeria | +234 7032745334 | freedommindsetng@gmail.com', margin, 31);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(253, 230, 138);
  doc.text('Requires employer visa sponsorship | Willing to relocate to Australia | Preparing TRA skills assessment', margin, 37);

  let currentY = 52;

  const printSectionHeader = (title: string, y: number) => {
    doc.setFillColor(39, 39, 42);
    doc.rect(margin, y, contentWidth, 6.5, 'F');
    doc.setFillColor(245, 158, 11);
    doc.rect(margin, y, 3, 6.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(title.toUpperCase(), margin + 5, y + 4.5);
    return y + 10;
  };

  // Section 1: Professional Summary
  currentY = printSectionHeader('Professional Summary', currentY);
  doc.setTextColor(30, 30, 30);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const summaryText = 
    'Cabinet maker with 7 years of hands-on experience designing, building and installing custom kitchen cabinetry and fitted furniture from HDF, MDF and melamine-faced (MFC) board. Trained through a furniture-making certificate at Abuja Enterprise Agency (AEA) Abuja, Nigeria, delivered by Dazzle Furniture Limited. Skilled in site measuring, cutting lists, board optimisation, hardware fitting and on-site installation, and uses SketchUp to plan layouts before production. Seeking a sponsored Cabinet Maker or Cabinet Maker/Installer role in Australia.';
  
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(splitSummary, margin, currentY);
  currentY += splitSummary.length * 4.2 + 4;

  // Section 2: Key Skills
  currentY = printSectionHeader('Key Skills & Technical Capabilities', currentY);

  const skillsLeft = [
    'Cabinet Making & Joinery:',
    '• Kitchen cabinets: base, wall, tall, pantry & island',
    '• Wardrobes and fitted storage solutions',
    '• Carcass construction, door and drawer fitting',
    '• Custom storage and corner solutions',
    '',
    'Materials & Production:',
    '• HDF, MDF and MFC board (high-gloss & matte)',
    '• Cutting lists, board optimization & material estimates',
    '• Edge finishing and cabinet preparation',
    '• Client briefs, measurements & design specs'
  ];

  const skillsRight = [
    'Hardware & Installation:',
    '• Concealed hinges, soft-close systems & runners',
    '• Handles, finger-pull profiles & adjustable shelves',
    '• On-site installation, leveling & final adjustments',
    '• Planning layouts around sinks, cooktops & appliances',
    '',
    'Tools & Software:',
    '• Panel cutting equipment, circular saws, drills',
    '• Measuring, squaring & leveling tools',
    '• SketchUp 3D kitchen & furniture design',
    '• CorelDRAW & Adobe Creative Suite'
  ];

  doc.setFontSize(8.5);
  let colY = currentY;
  skillsLeft.forEach((s) => {
    if (s.endsWith(':')) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(45, 45, 45);
    }
    if (s !== '') doc.text(s, margin, colY);
    colY += 4.2;
  });

  colY = currentY;
  skillsRight.forEach((s) => {
    if (s.endsWith(':')) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(45, 45, 45);
    }
    if (s !== '') doc.text(s, margin + contentWidth / 2, colY);
    colY += 4.2;
  });

  currentY = colY + 3;

  // Section 3: Experience
  currentY = printSectionHeader('Experience', currentY);

  // Role 1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Independent Cabinet Maker and Furniture Maker', margin, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 100, 100);
  doc.text('Nigeria | 2019 – Present', margin + contentWidth - 42, currentY);
  currentY += 4.5;

  const duties1 = [
    '• Design, build and install custom kitchen cabinets for private clients, from site measure to final handover.',
    '• Complete custom kitchens, wardrobes and fitted-furniture projects with precision tolerances.',
    '• Convert site measurements and kitchen layouts into accurate cabinet dimensions and cutting lists.',
    '• Reduce material waste by optimising board layouts and costs for each job.',
    '• Cut, assemble and fit carcasses, doors, drawers and hardware to a consistent high standard.',
    '• Advise clients on materials, layout, functionality and budget options.',
    '• Manage installation, alignment and finishing on site.'
  ];

  doc.setTextColor(45, 45, 45);
  duties1.forEach((d) => {
    const splitDuty = doc.splitTextToSize(d, contentWidth);
    doc.text(splitDuty, margin, currentY);
    currentY += splitDuty.length * 4 + 0.8;
  });

  currentY += 2;

  // Additional Employment Experience Section
  currentY = printSectionHeader('Additional Employment Experience', currentY);

  // Role 2
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Technology Tutor | Techxagon Academy', margin, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 100, 100);
  doc.text('Abuja, Nigeria | 2024 – Present', margin + contentWidth - 45, currentY);
  currentY += 4.5;

  const duties2 = [
    '• Teach computer studies and Python and Javascript programming fundamentals, webdevelopment (HTML, and CSS ) in secondary schools.',
    '• Build skills in planning, documentation and clear communication with clients and colleagues.',
    '• I have an established trade background.',
    '• I have continued practising cabinet making while employed elsewhere.',
    '• I am bringing independent project experience into an employee role.'
  ];

  doc.setTextColor(45, 45, 45);
  duties2.forEach((d) => {
    const splitDuty = doc.splitTextToSize(d, contentWidth);
    doc.text(splitDuty, margin, currentY);
    currentY += splitDuty.length * 4 + 0.8;
  });

  currentY += 3;

  // Section 4: Training, Certificates & Target Roles
  currentY = printSectionHeader('Training, Certificates & Target Roles', currentY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('Certifications:', margin, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(45, 45, 45);
  doc.text('• Certificate in Cabinetry and Furniture Making, AEA Abuja in collaboration with Dazzle Furniture Limited (Feb 2019)', margin + 28, currentY);
  currentY += 4.5;
  doc.text('• Certificate of Participation in General Entreprenuership Training, AEA Abuja (Aug 2019)', margin + 28, currentY);
  currentY += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('Target Roles:', margin, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(45, 45, 45);
  doc.text('Cabinet Maker | Kitchen Cabinet Maker | Cabinet Maker/Installer | Furniture Maker | Joinery Workshop Assistant', margin + 28, currentY);
  currentY += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('References:', margin, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(45, 45, 45);
  doc.text('Available on request.', margin + 28, currentY);

  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const pdfOutput = doc.output();
  fs.writeFileSync(path.join(publicDir, 'cv.pdf'), Buffer.from(pdfOutput, 'binary'));
  console.log('Successfully generated /public/cv.pdf');
}

generateCV();
