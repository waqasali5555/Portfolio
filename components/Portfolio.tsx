"use client";

import {
  Activity,
  ArrowDownToLine,
  Award,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code2,
  Cpu,
  ExternalLink,
  Github,
  GitBranch,
  Globe2,
  HardDrive,
  Layers3,
  Linkedin,
  LockKeyhole,
  Mail,
  MapPin,
  Network,
  Rocket,
  Send,
  ServerCog,
  ShieldCheck,
  Terminal,
  Workflow,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ElementType } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Stat = { label: string; value: number; suffix: string };
type SkillGroup = { title: string; icon: ElementType; items: string[]; level: number };
type IconLink = { label: string; icon: LucideIcon; href: string };
type IconCard = { title: string; icon: LucideIcon };
type ContactItem = { label: string; value: string; icon: LucideIcon };
type Project = {
  title: string;
  stack: string;
  tags: string[];
  challenge: string;
  impact: string;
};

const smoothEase = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: smoothEase } }
};

const stats: Stat[] = [
  { label: "Years Experience", value: 8, suffix: "+" },
  { label: "Production Projects", value: 64, suffix: "+" },
  { label: "Cloud Deployments", value: 220, suffix: "+" },
  { label: "Managed Nodes", value: 1400, suffix: "+" }
];

const skillGroups: SkillGroup[] = [
  { title: "Cloud Platforms", icon: Cloud, items: ["AWS", "Azure", "Google Cloud Platform"], level: 94 },
  { title: "Containers", icon: Boxes, items: ["Docker", "Kubernetes", "Helm", "ArgoCD"], level: 96 },
  { title: "Infrastructure as Code", icon: Code2, items: ["Terraform", "Ansible", "CloudFormation"], level: 92 },
  { title: "CI/CD", icon: Workflow, items: ["GitHub Actions", "GitLab CI/CD", "Jenkins", "Azure DevOps"], level: 95 },
  { title: "Observability", icon: Activity, items: ["Datadog", "Grafana", "Prometheus", "ELK Stack", "OpenSearch", "Loki", "Tempo", "Jaeger"], level: 91 },
  { title: "Programming", icon: Terminal, items: ["Python", "Bash", "YAML"], level: 87 },
  { title: "Security", icon: ShieldCheck, items: ["DevSecOps", "IAM", "WAF", "Secrets Management", "Vulnerability Management", "Compliance"], level: 90 },
  { title: "Operating Systems", icon: HardDrive, items: ["Linux", "Ubuntu", "CentOS", "RHEL"], level: 93 }
];

const clouds = [
  { name: "AWS", services: ["EKS", "ECS", "EC2", "Lambda", "VPC", "Route53", "RDS", "CloudFront", "S3"], color: "#22D3EE" },
  { name: "Azure", services: ["AKS", "Azure DevOps", "Azure Monitor", "Virtual Networks", "App Services", "Azure Security Center"], color: "#8B5CF6" },
  { name: "Google Cloud", services: ["GKE", "Compute Engine", "Cloud Run", "Cloud Storage", "Cloud Monitoring"], color: "#34D399" }
];

const services: IconCard[] = [
  { title: "DevOps Consulting", icon: BrainCircuit },
  { title: "Kubernetes Implementation", icon: Boxes },
  { title: "Multi-Cloud Architecture", icon: Globe2 },
  { title: "Cloud Migration", icon: Cloud },
  { title: "CI/CD Pipeline Automation", icon: Workflow },
  { title: "Infrastructure as Code", icon: Code2 },
  { title: "Platform Engineering", icon: Layers3 },
  { title: "DevSecOps", icon: LockKeyhole },
  { title: "Monitoring & Observability", icon: Activity },
  { title: "Site Reliability Engineering", icon: Zap },
  { title: "Cloud Cost Optimization", icon: Cpu },
  { title: "Production Support", icon: ServerCog }
];

const heroLinks: IconLink[] = [
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { label: "GitHub", icon: Github, href: "https://github.com" },
  { label: "Email", icon: Mail, href: "mailto:waqas@example.com" }
];

const contactItems: ContactItem[] = [
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com" },
  { icon: Github, label: "GitHub", value: "github.com" },
  { icon: Mail, label: "Email", value: "waqas@example.com" },
  { icon: MapPin, label: "Location", value: "Available remotely" }
];

const projects: Project[] = [
  {
    title: "Enterprise Multi-Cloud Platform",
    stack: "AWS + Azure + GCP",
    tags: ["Kubernetes", "Terraform", "GitOps"],
    challenge: "Unified fragmented cloud estates into a governed platform model.",
    impact: "Reduced environment delivery from weeks to hours while improving resilience."
  },
  {
    title: "Kubernetes Platform Engineering",
    stack: "EKS + AKS + GKE",
    tags: ["ArgoCD", "Helm", "Policy"],
    challenge: "Standardized clusters, add-ons, access, and deployment workflows.",
    impact: "Enabled product teams to ship independently with reliable guardrails."
  },
  {
    title: "Enterprise Observability Platform",
    stack: "Datadog + Grafana + Prometheus",
    tags: ["ELK Stack", "Loki", "Jaeger"],
    challenge: "Created end-to-end telemetry across apps, infrastructure, and services.",
    impact: "Improved incident response with actionable service-level dashboards."
  },
  {
    title: "DevSecOps Transformation",
    stack: "Security Automation",
    tags: ["CI/CD Security", "Compliance", "Secrets"],
    challenge: "Embedded security checks into pipelines without slowing delivery.",
    impact: "Raised compliance readiness and reduced high-risk releases."
  }
];

const timeline = [
  ["Senior DevOps Engineer", "Leading platform architecture, multi-cloud automation, production resilience, and DevSecOps adoption."],
  ["Cloud Engineer", "Built scalable cloud landing zones, CI/CD systems, managed Kubernetes platforms, and observability foundations."],
  ["Platform Engineer", "Enabled developer productivity with self-service workflows, GitOps, reusable modules, and secure infrastructure patterns."],
  ["System Administrator", "Managed Linux systems, networks, automation scripts, monitoring, backups, and reliable production operations."]
];

function useCounter(value: number) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 70;
    const animate = () => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / total, 3);
      setCount(Math.round(value * progress));
      if (frame < total) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  return { ref, count };
}

function ThreeNetwork() {
  const mount = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mount.current) return;
    const current = mount.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, current.clientWidth / current.clientHeight, 0.1, 1000);
    camera.position.z = 34;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(current.clientWidth, current.clientHeight);
    current.appendChild(renderer.domElement);

    const particles = new THREE.BufferGeometry();
    const count = 220;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 72;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 42;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 28;
    }
    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(
      particles,
      new THREE.PointsMaterial({ color: "#22D3EE", size: 0.09, transparent: true, opacity: 0.66 })
    );
    scene.add(points);

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(90 * 6);
    for (let i = 0; i < 90; i += 1) {
      const a = Math.floor(Math.random() * count);
      const b = Math.floor(Math.random() * count);
      linePositions.set(positions.slice(a * 3, a * 3 + 3), i * 6);
      linePositions.set(positions.slice(b * 3, b * 3 + 3), i * 6 + 3);
    }
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(
      lineGeometry,
      new THREE.LineBasicMaterial({ color: "#8B5CF6", transparent: true, opacity: 0.2 })
    );
    scene.add(lines);

    let animation = 0;
    const render = () => {
      animation = requestAnimationFrame(render);
      points.rotation.y += 0.0018;
      points.rotation.x += 0.0007;
      lines.rotation.copy(points.rotation);
      renderer.render(scene, camera);
    };
    render();

    const resize = () => {
      camera.aspect = current.clientWidth / current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(current.clientWidth, current.clientHeight);
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", resize);
      current.removeChild(renderer.domElement);
      renderer.dispose();
      particles.dispose();
      lineGeometry.dispose();
    };
  }, []);

  return <div ref={mount} className="pointer-events-none absolute inset-0 z-0 opacity-75" aria-hidden />;
}

function DevOpsBackdrop() {
  const nodes: Array<{ label: string; Icon: LucideIcon; className: string; delay: string }> = [
    { label: "K8s Cluster", Icon: Boxes, className: "left-[6%] top-[18%]", delay: "0s" },
    { label: "Docker Runtime", Icon: Layers3, className: "right-[8%] top-[24%]", delay: "1.4s" },
    { label: "CI/CD Flow", Icon: GitBranch, className: "left-[18%] top-[58%]", delay: "0.8s" },
    { label: "Cloud Node", Icon: Cloud, className: "right-[18%] top-[64%]", delay: "2.1s" },
    { label: "Telemetry", Icon: Activity, className: "left-[52%] top-[14%]", delay: "1.1s" },
    { label: "Secure Edge", Icon: ShieldCheck, className: "right-[34%] top-[82%]", delay: "2.7s" }
  ];

  const lines = [
    "left-[13%] top-[27%] w-[34%] rotate-[8deg]",
    "right-[14%] top-[34%] w-[28%] rotate-[-12deg]",
    "left-[24%] top-[66%] w-[30%] rotate-[-7deg]",
    "right-[23%] top-[73%] w-[24%] rotate-[12deg]",
    "left-[46%] top-[22%] w-[22%] rotate-[35deg]"
  ];

  return (
    <div className="devops-backdrop" aria-hidden>
      {nodes.map(({ label, Icon, className, delay }) => (
        <div key={label} className={`devops-node ${className}`} style={{ animationDelay: delay }}>
          <Icon className="h-4 w-4" />
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em]">{label}</span>
        </div>
      ))}
      {lines.map((className, index) => (
        <div key={className} className={`devops-line ${className}`} style={{ animationDelay: `${index * 0.65}s` }} />
      ))}
      <div className="metric-stream left-[7%] top-[78%]">
        {[42, 66, 38, 82, 52, 74, 46, 68].map((height, index) => (
          <span key={index} style={{ height: `${height}%`, animationDelay: `${index * 0.12}s` }} />
        ))}
      </div>
      <div className="metric-stream right-[7%] top-[46%]">
        {[58, 34, 76, 44, 88, 62, 52, 80].map((height, index) => (
          <span key={index} style={{ height: `${height}%`, animationDelay: `${index * 0.14}s` }} />
        ))}
      </div>
    </div>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  const { ref, count } = useCounter(stat.value);
  return (
    <motion.div variants={item} ref={ref} className="glass rounded-lg p-5">
      <div className="text-3xl font-semibold text-white sm:text-4xl">
        {count.toLocaleString()}
        <span className="text-cyanx">{stat.suffix}</span>
      </div>
      <div className="mt-2 text-sm uppercase tracking-[0.18em] text-mutedx">{stat.label}</div>
    </motion.div>
  );
}

function SectionHeader({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.65 }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <div className="text-sm font-semibold uppercase tracking-[0.28em] text-cyanx">{eyebrow}</div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h2>
      {copy ? <p className="mt-5 text-base leading-8 text-mutedx sm:text-lg">{copy}</p> : null}
    </motion.div>
  );
}

function HeroDiagram() {
  const nodes: Array<{ label: string; className: string; Icon: LucideIcon }> = [
    { label: "AWS", className: "top-[13%] left-[9%]", Icon: Cloud },
    { label: "GCP", className: "top-[14%] right-[10%]", Icon: Globe2 },
    { label: "AKS", className: "bottom-[16%] left-[13%]", Icon: Boxes },
    { label: "CI/CD", className: "bottom-[13%] right-[12%]", Icon: GitBranch },
    { label: "K8s", className: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", Icon: Network }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.15 }}
      className="relative mx-auto aspect-square w-full max-w-[560px]"
    >
      <div className="absolute inset-3 rounded-full border border-cyanx/20" />
      <div className="absolute inset-16 rounded-full border border-violetx/25" />
      <div className="absolute inset-28 rounded-full border border-mintx/25" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyanx/35 to-transparent" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-violetx/35 to-transparent" />
      <div className="absolute inset-0 animate-pulseLine rounded-full border border-cyanx/30" />

      {nodes.map(({ label, className, Icon }, index) => (
        <motion.div
          key={label}
          animate={{ y: [0, index % 2 ? -8 : 8, 0] }}
          transition={{ duration: 4 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
          className={`glass absolute ${className} flex h-24 w-24 flex-col items-center justify-center rounded-lg text-center shadow-glow`}
        >
          <Icon className="h-7 w-7 text-cyanx" />
          <span className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-white">{label}</span>
        </motion.div>
      ))}

      <div className="absolute left-[22%] top-[36%] h-1 w-[56%] overflow-hidden rounded-full bg-white/5">
        <motion.div
          animate={{ x: ["-100%", "220%"] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
          className="h-full w-24 rounded-full bg-cyanx"
        />
      </div>
      <div className="absolute bottom-[31%] left-[21%] h-1 w-[58%] rotate-[-32deg] overflow-hidden rounded-full bg-white/5">
        <motion.div
          animate={{ x: ["-100%", "220%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear", delay: 0.5 }}
          className="h-full w-24 rounded-full bg-mintx"
        />
      </div>
    </motion.div>
  );
}

function SkillCard({ group }: { group: SkillGroup }) {
  const Icon = group.icon;
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -8, scale: 1.01 }}
      className="glass group rounded-lg p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-cyanx/20 bg-cyanx/10 p-3 text-cyanx">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">{group.title}</h3>
        </div>
        <span className="text-sm font-semibold text-mintx">{group.level}%</span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {group.items.map((skill) => (
          <span key={skill} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-slate-200">
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/8">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${group.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-cyanx via-violetx to-mintx"
        />
      </div>
    </motion.div>
  );
}

function CloudShowcase() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-16 hidden h-[calc(100%-8rem)] w-px bg-gradient-to-b from-cyanx/0 via-cyanx/35 to-cyanx/0 lg:block" />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="grid gap-6 lg:grid-cols-3"
      >
        {clouds.map((cloud, index) => (
          <motion.div
            key={cloud.name}
            variants={item}
            whileHover={{ y: -8 }}
            className="glass relative overflow-hidden rounded-lg p-7"
          >
            <div className="absolute right-6 top-6 h-24 w-24 rounded-full blur-3xl" style={{ backgroundColor: `${cloud.color}22` }} />
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-lg font-black" style={{ color: cloud.color }}>
                {index + 1}
              </span>
              <h3 className="text-2xl font-semibold">{cloud.name}</h3>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {cloud.services.map((service) => (
                <div key={service} className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-3 text-sm text-slate-200">
                  {service}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      variants={item}
      whileHover={{ y: -8 }}
      className="glass overflow-hidden rounded-lg"
    >
      <div className="relative h-48 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-3 p-6 opacity-80">
          {Array.from({ length: 24 }).map((_, cell) => (
            <motion.div
              key={cell}
              animate={{ opacity: [0.25, 0.9, 0.25] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: (cell + index) * 0.06 }}
              className="rounded border border-cyanx/20 bg-cyanx/10"
            />
          ))}
        </div>
        <div className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-cyanx via-violetx to-mintx" />
        <div className="absolute bottom-5 left-5 rounded-md border border-white/10 bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyanx backdrop-blur">
          Architecture
        </div>
      </div>
      <div className="p-6">
        <div className="text-sm uppercase tracking-[0.2em] text-mintx">{project.stack}</div>
        <h3 className="mt-3 text-2xl font-semibold text-white">{project.title}</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-white/[0.06] px-3 py-1 text-xs text-slate-200">{tag}</span>
          ))}
        </div>
        <p className="mt-5 text-sm leading-6 text-mutedx"><span className="text-white">Challenge:</span> {project.challenge}</p>
        <p className="mt-3 text-sm leading-6 text-mutedx"><span className="text-white">Impact:</span> {project.impact}</p>
        <div className="mt-6 flex gap-3">
          <a href="https://github.com" className="inline-flex items-center gap-2 text-sm font-semibold text-cyanx" aria-label={`${project.title} GitHub`}>
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-mintx" aria-label={`${project.title} case study`}>
            <ExternalLink className="h-4 w-4" /> Case Study
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function MetricChart({ label, value, color }: { label: string; value: string; color: string }) {
  const bars = useMemo(() => Array.from({ length: 18 }, (_, index) => 28 + ((index * 17) % 52)), []);
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-mutedx">{label}</span>
        <span className="text-sm font-semibold text-white">{value}</span>
      </div>
      <div className="mt-5 flex h-24 items-end gap-1.5">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            animate={{ height: [`${height}%`, `${Math.min(96, height + 24)}%`, `${Math.max(18, height - 12)}%`, `${height}%`] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.05, ease: "easeInOut" }}
            className="w-full rounded-t"
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <main className="mesh-bg min-h-screen overflow-hidden">
      <motion.div className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-cyanx via-violetx to-mintx" style={{ scaleX }} />
      <div className="grid-overlay pointer-events-none fixed inset-0 z-0" />
      <ThreeNetwork />
      <DevOpsBackdrop />

      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/8 bg-ink/72 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#hero" className="text-sm font-bold uppercase tracking-[0.24em] text-white">Waqas Ali</a>
          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            {["About", "Skills", "Cloud", "Projects", "Contact"].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="transition hover:text-cyanx">{link}</a>
            ))}
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-md border border-cyanx/30 bg-cyanx/10 px-4 py-2 text-sm font-semibold text-cyanx shadow-glow transition hover:bg-cyanx/20 hover:shadow-violet">
            Hire Me <ChevronRight className="h-4 w-4" />
          </a>
        </nav>
      </header>

      <section id="hero" className="relative z-10 min-h-screen px-5 pt-32">
        <motion.div style={{ y }} className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-cyanx/25 bg-cyanx/10 px-4 py-2 text-sm font-semibold text-cyanx">
              <span className="h-2 w-2 rounded-full bg-mintx shadow-[0_0_18px_rgba(16,185,129,0.8)]" />
              Cloud Control Center Portfolio
            </motion.div>
            <motion.h1 variants={item} className="mt-8 text-5xl font-black uppercase tracking-normal text-white sm:text-7xl lg:text-8xl">
              Waqas Ali
            </motion.h1>
            <motion.p variants={item} className="mt-5 text-xl font-semibold text-cyanx sm:text-2xl">
              Senior DevOps & Multi-Cloud Engineer
            </motion.p>
            <motion.p variants={item} className="mt-6 max-w-3xl text-2xl font-medium leading-snug text-white sm:text-3xl">
              Designing, Automating, Securing and Scaling Modern Cloud Platforms Across AWS, Azure and Google Cloud.
            </motion.p>
            <motion.p variants={item} className="mt-6 max-w-2xl text-base leading-8 text-mutedx sm:text-lg">
              Senior DevOps and Cloud Engineer with expertise in Kubernetes, Platform Engineering, Infrastructure as Code, CI/CD Automation, Observability, Security, and Multi-Cloud Architecture.
            </motion.p>
            <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
              <a href="/resume.pdf" className="inline-flex items-center gap-2 rounded-md bg-cyanx px-5 py-3 font-semibold text-ink shadow-glow transition hover:scale-[1.02] hover:shadow-[0_0_58px_rgba(34,211,238,0.34)]">
                <ArrowDownToLine className="h-5 w-5" /> Download Resume
              </a>
              <a href="#projects" className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 font-semibold text-white shadow-[0_14px_40px_rgba(0,0,0,0.22)] transition hover:border-violetx hover:text-cyanx hover:shadow-violet">
                <Rocket className="h-5 w-5" /> View Projects
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-md border border-mintx/30 bg-mintx/10 px-5 py-3 font-semibold text-mintx shadow-emerald transition hover:bg-mintx/20">
                <Mail className="h-5 w-5" /> Contact Me
              </a>
            </motion.div>
            <motion.div variants={item} className="mt-9 flex items-center gap-4">
              {heroLinks.map(({ label, icon: Icon, href }) => (
                <a key={label} href={href} aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.05] text-slate-300 transition hover:border-cyanx hover:text-cyanx">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          </motion.div>
          <HeroDiagram />
        </motion.div>
      </section>

      <section id="about" className="section-pad relative z-10 px-5">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Professional Summary"
            title="Architecting reliable cloud platforms for serious engineering teams."
            copy="Senior DevOps & Cloud Engineer with extensive experience designing, implementing, and managing highly available, secure, scalable cloud-native platforms across AWS, Microsoft Azure, and Google Cloud Platform."
          />
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
          </motion.div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["Cloud Architecture", "Kubernetes", "Platform Engineering", "Infrastructure as Code", "Automation", "DevSecOps", "CI/CD", "Observability", "SRE Practices", "Cost Optimization", "Cloud Security"].map((tag) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="section-pad relative z-10 px-5">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Technical Arsenal" title="Senior-level DevOps, cloud, security, and automation skills." />
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((group) => <SkillCard key={group.title} group={group} />)}
          </motion.div>
        </div>
      </section>

      <section id="cloud" className="section-pad relative z-10 px-5">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Multi-Cloud Expertise"
            title="One operating model across AWS, Azure, and Google Cloud."
            copy="Cloud architecture diagrams, service catalogs, and secure landing-zone patterns connect into one cohesive platform engineering strategy."
          />
          <CloudShowcase />
        </div>
      </section>

      <section id="services" className="section-pad relative z-10 px-5">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Services" title="Premium engineering services for enterprise cloud teams." />
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map(({ title, icon: Icon }) => (
              <motion.div key={title} variants={item} whileHover={{ y: -7 }} className="glass rounded-lg p-5">
                <Icon className="h-6 w-6 text-cyanx" />
                <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-mutedx">Strategy, implementation, automation, and operational excellence for production platforms.</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="projects" className="section-pad relative z-10 px-5">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Projects" title="Architecture-led engagements with measurable business impact." />
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
          </motion.div>
        </div>
      </section>

      <section id="observability" className="section-pad relative z-10 px-5">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Observability"
            title="Futuristic monitoring dashboard simulation."
            copy="Live-feeling metrics for CPU, memory, latency, errors, service health, and infrastructure monitoring across Datadog, Grafana, Prometheus, ELK, Loki, Tempo, and Jaeger."
          />
          <div className="glass rounded-lg p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <h3 className="text-2xl font-semibold">Production Telemetry Grid</h3>
                <p className="mt-1 text-sm text-mutedx">SLOs, traces, logs, and infrastructure signals</p>
              </div>
              <div className="flex items-center gap-2 rounded-md border border-mintx/25 bg-mintx/10 px-3 py-2 text-sm font-semibold text-mintx">
                <CheckCircle2 className="h-4 w-4" /> All Systems Healthy
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <MetricChart label="CPU Metrics" value="38%" color="linear-gradient(180deg, #22D3EE, rgba(34,211,238,.22))" />
              <MetricChart label="Memory Usage" value="61%" color="linear-gradient(180deg, #8B5CF6, rgba(139,92,246,.22))" />
              <MetricChart label="Error Rates" value="0.08%" color="linear-gradient(180deg, #34D399, rgba(52,211,153,.22))" />
              <MetricChart label="Request Latency" value="87ms" color="linear-gradient(180deg, #F59E0B, rgba(245,158,11,.18))" />
              <MetricChart label="Service Health" value="99.98%" color="linear-gradient(180deg, #34D399, rgba(52,211,153,.22))" />
              <MetricChart label="Infrastructure Monitoring" value="1.4k nodes" color="linear-gradient(180deg, #8B5CF6, rgba(139,92,246,.22))" />
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="section-pad relative z-10 px-5">
        <div className="mx-auto max-w-5xl">
          <SectionHeader eyebrow="Experience" title="A career timeline built around reliability and scale." />
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyanx via-violetx to-mintx md:left-1/2" />
            {timeline.map(([role, copy], index) => (
              <motion.div
                key={role}
                initial={{ opacity: 0, x: index % 2 ? 36 : -36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative mb-8 pl-12 md:w-1/2 ${index % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"}`}
              >
                <span className={`absolute top-4 h-4 w-4 rounded-full border-2 border-cyanx bg-ink shadow-glow md:${index % 2 ? "left-[-8px]" : "right-[-8px]"} left-[-7px]`} />
                <div className="glass rounded-lg p-6">
                  <h3 className="text-xl font-semibold">{role}</h3>
                  <p className="mt-3 text-sm leading-7 text-mutedx">{copy}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="section-pad relative z-10 px-5">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Certifications" title="Credential-ready cloud, platform, and Linux expertise." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["AWS Certifications", "Azure Certifications", "Google Cloud Certifications", "Kubernetes Certifications", "Terraform Certifications", "Linux Certifications"].map((cert) => (
              <motion.div key={cert} whileHover={{ y: -8, rotateX: 4 }} className="glass rounded-lg p-6">
                <Award className="h-8 w-8 text-mintx" />
                <h3 className="mt-5 text-xl font-semibold">{cert}</h3>
                <p className="mt-3 text-sm leading-6 text-mutedx">Validated capability across enterprise-grade architecture, automation, operations, and secure delivery.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="section-pad relative z-10 px-5">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Testimonials" title="Trusted by teams that need infrastructure to simply work." />
          <div className="overflow-hidden">
            <div className="flex w-[200%] gap-5 animate-marquee">
              {[
                "Waqas brings rare clarity to complex cloud environments and turns architecture into reliable delivery.",
                "Our Kubernetes platform became easier to operate, easier to secure, and faster for developers.",
                "A calm senior engineer who understands production pressure and designs systems accordingly.",
                "The observability work gave leadership and engineers the same accurate picture of service health."
              ].concat([
                "Waqas brings rare clarity to complex cloud environments and turns architecture into reliable delivery.",
                "Our Kubernetes platform became easier to operate, easier to secure, and faster for developers.",
                "A calm senior engineer who understands production pressure and designs systems accordingly.",
                "The observability work gave leadership and engineers the same accurate picture of service health."
              ]).map((quote, index) => (
                <div key={`${quote}-${index}`} className="glass min-w-[320px] rounded-lg p-6 sm:min-w-[420px]">
                  <p className="text-base leading-7 text-slate-200">"{quote}"</p>
                  <div className="mt-5 text-sm font-semibold text-cyanx">Enterprise Cloud Stakeholder</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-pad relative z-10 px-5">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader eyebrow="Contact" title="Build the platform your teams deserve." copy="Available for enterprise cloud consulting, platform engineering, DevOps automation, production support, and senior-level engineering roles." />
            <div className="space-y-4">
              {contactItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-4">
                  <Icon className="h-5 w-5 text-cyanx" />
                  <div>
                    <div className="text-sm text-mutedx">{label}</div>
                    <div className="font-semibold text-white">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form className="glass rounded-lg p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {["Name", "Email", "Company", "Project Type"].map((field) => (
                <label key={field} className="block">
                  <span className="text-sm font-medium text-slate-300">{field}</span>
                  <input className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyanx" placeholder={field} />
                </label>
              ))}
            </div>
            <label className="mt-5 block">
              <span className="text-sm font-medium text-slate-300">Message</span>
              <textarea className="mt-2 min-h-40 w-full rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyanx" placeholder="Tell me about your platform, cloud, Kubernetes, or DevOps challenge." />
            </label>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-cyanx via-violetx to-mintx px-5 py-4 font-bold text-ink">
              <Send className="h-5 w-5" /> Send Message
            </motion.button>
          </form>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <div className="text-xl font-bold">Waqas Ali</div>
            <div className="mt-1 text-sm text-mutedx">Senior DevOps & Multi-Cloud Engineer</div>
            <div className="mt-3 text-sm text-slate-300">"Automating Infrastructure. Scaling Platforms. Enabling Innovation."</div>
          </div>
          <div className="flex flex-col items-center gap-3 md:items-end">
            <div className="flex gap-3">
              {[Linkedin, Github, Mail].map((Icon, index) => (
                <a key={index} href="#hero" className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-slate-300 transition hover:text-cyanx">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <div className="text-sm text-mutedx">Copyright 2026 Waqas Ali. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
