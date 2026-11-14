/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { Project, CountryPerspective } from './types';
import { PROJECTS } from './data/projects';
import { detectRegionByIp } from './utils/detectRegionByIp';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import TrainingAndTargetSection from './components/TrainingAndTargetSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import CVModal from './components/CVModal';
import CertificateModal from './components/CertificateModal';

const HERO_IMAGE = '/images/projects/saw use.jpg';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [selectedCertIndex, setSelectedCertIndex] = useState(0);
  const [country, setCountry] = useState<CountryPerspective>('international');
  const hasUserSelectedRegionRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    detectRegionByIp(controller.signal).then((detectedRegion) => {
      if (active && !hasUserSelectedRegionRef.current) {
        setCountry(detectedRegion);
      }
    });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const handleSelectCountry = (nextCountry: CountryPerspective) => {
    hasUserSelectedRegionRef.current = true;
    setCountry(nextCountry);
  };

  const handleOpenCertificateModal = (index: number = 0) => {
    setSelectedCertIndex(index);
    setIsCertificateModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-600 selection:text-white antialiased">
      <Navbar country={country} />

      <main className="flex-1">
        <Hero
          heroImage={HERO_IMAGE}
          country={country}
          onSelectCountry={handleSelectCountry}
          onOpenCVModal={() => setIsCVModalOpen(true)}
          onOpenCertificateModal={() => handleOpenCertificateModal(0)}
        />

        <ProjectsSection
          projects={PROJECTS}
          onSelectProject={(project, imageIndex = 0) => {
            setSelectedImageIndex(imageIndex);
            setSelectedProject(project);
          }}
        />

        <ExperienceSection />

        <TrainingAndTargetSection
          onOpenCertificateModal={(idx) => handleOpenCertificateModal(idx ?? 0)}
        />

        <ContactSection />
      </main>

      <Footer country={country} />

      <ProjectModal
        project={selectedProject}
        initialImageIndex={selectedImageIndex}
        onClose={() => setSelectedProject(null)}
      />

      <CVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
        country={country}
        onSelectCountry={handleSelectCountry}
      />

      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        certIndex={selectedCertIndex}
      />
    </div>
  );
}
