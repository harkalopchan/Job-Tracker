--
-- PostgreSQL database dump
--

\restrict EqjfVTdEmaqINoUBwF4Wc9GBO99IeJd7HEh1k6SU2Fp29QvlS2fdUwtB0fxKx3l

-- Dumped from database version 16.13 (Homebrew)
-- Dumped by pg_dump version 16.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: harkalopchan
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO harkalopchan;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: harkalopchan
--

COMMENT ON SCHEMA public IS '';


--
-- Name: Priority; Type: TYPE; Schema: public; Owner: harkalopchan
--

CREATE TYPE public."Priority" AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH',
    'URGENT'
);


ALTER TYPE public."Priority" OWNER TO harkalopchan;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: harkalopchan
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO harkalopchan;

--
-- Name: Stage; Type: TYPE; Schema: public; Owner: harkalopchan
--

CREATE TYPE public."Stage" AS ENUM (
    'APPLIED',
    'INTERVIEW',
    'OFFER',
    'REJECTED',
    'WITHDRAWN'
);


ALTER TYPE public."Stage" OWNER TO harkalopchan;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: harkalopchan
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO harkalopchan;

--
-- Name: job_tags; Type: TABLE; Schema: public; Owner: harkalopchan
--

CREATE TABLE public.job_tags (
    id text NOT NULL,
    "jobId" text NOT NULL,
    "tagId" text NOT NULL
);


ALTER TABLE public.job_tags OWNER TO harkalopchan;

--
-- Name: jobs; Type: TABLE; Schema: public; Owner: harkalopchan
--

CREATE TABLE public.jobs (
    id text NOT NULL,
    title text NOT NULL,
    company text NOT NULL,
    location text,
    description text,
    salary text,
    url text,
    stage public."Stage" DEFAULT 'APPLIED'::public."Stage" NOT NULL,
    priority public."Priority" DEFAULT 'MEDIUM'::public."Priority" NOT NULL,
    "appliedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public.jobs OWNER TO harkalopchan;

--
-- Name: notes; Type: TABLE; Schema: public; Owner: harkalopchan
--

CREATE TABLE public.notes (
    id text NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text NOT NULL,
    "jobId" text
);


ALTER TABLE public.notes OWNER TO harkalopchan;

--
-- Name: tags; Type: TABLE; Schema: public; Owner: harkalopchan
--

CREATE TABLE public.tags (
    id text NOT NULL,
    name text NOT NULL,
    color text DEFAULT '#3B82F6'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.tags OWNER TO harkalopchan;

--
-- Name: users; Type: TABLE; Schema: public; Owner: harkalopchan
--

CREATE TABLE public.users (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO harkalopchan;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: harkalopchan
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
\.


--
-- Data for Name: job_tags; Type: TABLE DATA; Schema: public; Owner: harkalopchan
--

COPY public.job_tags (id, "jobId", "tagId") FROM stdin;
cmmowvlbm000mrqj6rla70kvb	cmmowvlbi0009rqj6eh6lnaf0	cmmowvlbd0003rqj6s51uge0t
cmmowvlbm000jrqj6qifvxz17	cmmowvlbi0009rqj6eh6lnaf0	cmmowvlb80002rqj6o1qbikvw
cmmowvlbm000prqj6o6zke2m3	cmmowvlbi000arqj6uw9itqfy	cmmowvlbf0005rqj6cc2i021e
cmmowvlbm000nrqj6pmrdyujp	cmmowvlbi000brqj6ei3ovkr1	cmmowvlbe0004rqj6015ybpq1
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: harkalopchan
--

COPY public.jobs (id, title, company, location, description, salary, url, stage, priority, "appliedAt", "updatedAt", "userId") FROM stdin;
cmmowvlbi000arqj6uw9itqfy	DevOps Engineer	Enterprise Solutions	New York, NY	Manage cloud infrastructure and deployment pipelines	$130k - $160k	https://enterprise.com/careers	OFFER	URGENT	2026-02-27 13:07:11.405	2026-03-13 13:07:11.405	cmmowvlb20000rqj6u64sung2
cmmowvlbi0009rqj6eh6lnaf0	Senior Frontend Developer	Tech Corp	San Francisco, CA	Building modern web applications with React and TypeScript	$120k - $150k	https://techcorp.com/careers	APPLIED	HIGH	2026-03-13 13:07:11.405	2026-03-13 13:07:11.405	cmmowvlb20000rqj6u64sung2
cmmowvlbi000brqj6ei3ovkr1	Full Stack Engineer	Startup Inc	Remote	Join our fast-growing startup and build amazing products	$90k - $120k	https://startupinc.com/jobs	INTERVIEW	MEDIUM	2026-03-06 13:07:11.405	2026-03-13 13:07:11.405	cmmowvlb20000rqj6u64sung2
\.


--
-- Data for Name: notes; Type: TABLE DATA; Schema: public; Owner: harkalopchan
--

COPY public.notes (id, content, "createdAt", "updatedAt", "userId", "jobId") FROM stdin;
cmmowvlbk000grqj6dke0cce2	First interview scheduled for next week. Need to prepare for React questions.	2026-03-13 13:07:11.408	2026-03-13 13:07:11.408	cmmowvlb20000rqj6u64sung2	cmmowvlbi000brqj6ei3ovkr1
cmmowvlbk000erqj6xcl8xea3	Applied through LinkedIn. Company seems to have good work-life balance.	2026-03-13 13:07:11.408	2026-03-13 13:07:11.408	cmmowvlb20000rqj6u64sung2	cmmowvlbi0009rqj6eh6lnaf0
cmmowvlbk000hrqj6ibbkii01	Received offer! Great benefits package and growth opportunities.	2026-03-13 13:07:11.408	2026-03-13 13:07:11.408	cmmowvlb20000rqj6u64sung2	cmmowvlbi000arqj6uw9itqfy
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: harkalopchan
--

COPY public.tags (id, name, color, "createdAt", "updatedAt") FROM stdin;
cmmowvlb80002rqj6o1qbikvw	Remote	#3B82F6	2026-03-13 13:07:11.397	2026-03-13 13:07:11.397
cmmowvlbd0003rqj6s51uge0t	Full-time	#10B981	2026-03-13 13:07:11.397	2026-03-13 13:07:11.397
cmmowvlbe0004rqj6015ybpq1	Startup	#F59E0B	2026-03-13 13:07:11.397	2026-03-13 13:07:11.397
cmmowvlbf0005rqj6cc2i021e	High Salary	#EF4444	2026-03-13 13:07:11.397	2026-03-13 13:07:11.397
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: harkalopchan
--

COPY public.users (id, email, password, name, role, "createdAt", "updatedAt") FROM stdin;
cmmowvlb20000rqj6u64sung2	demo@example.com	$2b$10$kJEzlpaFe.77uGpEpLSla.F5zfboufXsIdKPJK5Mvcx2uzjRfAwvS	Demo User	USER	2026-03-13 13:07:11.39	2026-03-13 13:07:11.39
cmmowvlb70001rqj61h5s3cvv	admin@example.com	$2b$10$kJEzlpaFe.77uGpEpLSla.F5zfboufXsIdKPJK5Mvcx2uzjRfAwvS	Admin User	ADMIN	2026-03-13 13:07:11.396	2026-03-13 13:07:11.396
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: harkalopchan
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: job_tags job_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: harkalopchan
--

ALTER TABLE ONLY public.job_tags
    ADD CONSTRAINT job_tags_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: harkalopchan
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: notes notes_pkey; Type: CONSTRAINT; Schema: public; Owner: harkalopchan
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: harkalopchan
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: harkalopchan
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: job_tags_jobId_tagId_key; Type: INDEX; Schema: public; Owner: harkalopchan
--

CREATE UNIQUE INDEX "job_tags_jobId_tagId_key" ON public.job_tags USING btree ("jobId", "tagId");


--
-- Name: tags_name_key; Type: INDEX; Schema: public; Owner: harkalopchan
--

CREATE UNIQUE INDEX tags_name_key ON public.tags USING btree (name);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: harkalopchan
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: job_tags job_tags_jobId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: harkalopchan
--

ALTER TABLE ONLY public.job_tags
    ADD CONSTRAINT "job_tags_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES public.jobs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: job_tags job_tags_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: harkalopchan
--

ALTER TABLE ONLY public.job_tags
    ADD CONSTRAINT "job_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public.tags(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: jobs jobs_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: harkalopchan
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT "jobs_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: notes notes_jobId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: harkalopchan
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT "notes_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES public.jobs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: notes notes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: harkalopchan
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT "notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: harkalopchan
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict EqjfVTdEmaqINoUBwF4Wc9GBO99IeJd7HEh1k6SU2Fp29QvlS2fdUwtB0fxKx3l

