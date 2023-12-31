--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.3

-- Started on 2023-07-20 19:19:08 EDT

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
-- TOC entry 16 (class 2615 OID 28515)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 495 (class 1255 OID 28992)
-- Name: handle_new_public_user(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_new_public_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
begin
  insert into public.users (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;


ALTER FUNCTION public.handle_new_public_user() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 274 (class 1259 OID 29833)
-- Name: challengers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.challengers (
    id bigint NOT NULL,
    user_id uuid NOT NULL,
    body text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    competition_id bigint,
    submission_date text,
    is_submitted boolean DEFAULT false
);


ALTER TABLE public.challengers OWNER TO postgres;

--
-- TOC entry 3751 (class 0 OID 0)
-- Dependencies: 274
-- Name: TABLE challengers; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.challengers IS 'Store each challenger';


--
-- TOC entry 275 (class 1259 OID 29861)
-- Name: competitions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.competitions (
    id bigint NOT NULL,
    user_id uuid NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    body text NOT NULL,
    is_featured boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    description text,
    start_date text,
    end_date text,
    banner_url text
);


ALTER TABLE public.competitions OWNER TO postgres;

--
-- TOC entry 273 (class 1259 OID 29832)
-- Name: competitions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.challengers ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.competitions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 276 (class 1259 OID 29937)
-- Name: competitions_id_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.competitions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.competitions_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 267 (class 1259 OID 29218)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    updated_at timestamp with time zone,
    username text,
    full_name text,
    avatar_url text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 280 (class 1259 OID 30003)
-- Name: votes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.votes (
    id bigint NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    challengers_id bigint
);


ALTER TABLE public.votes OWNER TO postgres;

--
-- TOC entry 279 (class 1259 OID 30002)
-- Name: votes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.votes ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.votes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 278 (class 1259 OID 29983)
-- Name: watching; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.watching (
    id bigint NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    competition_id bigint
);


ALTER TABLE public.watching OWNER TO postgres;

--
-- TOC entry 277 (class 1259 OID 29982)
-- Name: watching_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.watching ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.watching_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3575 (class 2606 OID 29929)
-- Name: competitions competitions_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competitions
    ADD CONSTRAINT competitions_id_key UNIQUE (id);


--
-- TOC entry 3573 (class 2606 OID 29840)
-- Name: challengers competitions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.challengers
    ADD CONSTRAINT competitions_pkey PRIMARY KEY (id);


--
-- TOC entry 3577 (class 2606 OID 29927)
-- Name: competitions competitions_pkey1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competitions
    ADD CONSTRAINT competitions_pkey1 PRIMARY KEY (id);


--
-- TOC entry 3569 (class 2606 OID 29452)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3571 (class 2606 OID 29460)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3581 (class 2606 OID 30008)
-- Name: votes votes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_pkey PRIMARY KEY (id);


--
-- TOC entry 3579 (class 2606 OID 29991)
-- Name: watching watching_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watching
    ADD CONSTRAINT watching_pkey PRIMARY KEY (id);


--
-- TOC entry 3583 (class 2606 OID 29948)
-- Name: challengers challengers_competition_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.challengers
    ADD CONSTRAINT challengers_competition_id_fkey FOREIGN KEY (competition_id) REFERENCES public.competitions(id);


--
-- TOC entry 3584 (class 2606 OID 29943)
-- Name: challengers challengers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.challengers
    ADD CONSTRAINT challengers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3585 (class 2606 OID 29977)
-- Name: competitions competitions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competitions
    ADD CONSTRAINT competitions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3582 (class 2606 OID 29668)
-- Name: users users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id);


--
-- TOC entry 3588 (class 2606 OID 30019)
-- Name: votes votes_challengers_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_challengers_id_fkey FOREIGN KEY (challengers_id) REFERENCES public.challengers(id);


--
-- TOC entry 3589 (class 2606 OID 30014)
-- Name: votes votes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3586 (class 2606 OID 29997)
-- Name: watching watching_competition_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watching
    ADD CONSTRAINT watching_competition_id_fkey FOREIGN KEY (competition_id) REFERENCES public.competitions(id);


--
-- TOC entry 3587 (class 2606 OID 29992)
-- Name: watching watching_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watching
    ADD CONSTRAINT watching_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3741 (class 3256 OID 29968)
-- Name: competitions Enable insert for authenticated users only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for authenticated users only" ON public.competitions FOR INSERT TO authenticated WITH CHECK (true);


--
-- TOC entry 3740 (class 3256 OID 29967)
-- Name: competitions Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.competitions FOR SELECT USING (true);


--
-- TOC entry 3742 (class 3256 OID 29969)
-- Name: competitions Enable update for users based on email; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable update for users based on email" ON public.competitions FOR UPDATE USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- TOC entry 3739 (class 0 OID 29861)
-- Dependencies: 275
-- Name: competitions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 3749 (class 0 OID 0)
-- Dependencies: 16
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- TOC entry 3750 (class 0 OID 0)
-- Dependencies: 495
-- Name: FUNCTION handle_new_public_user(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.handle_new_public_user() TO anon;
GRANT ALL ON FUNCTION public.handle_new_public_user() TO authenticated;
GRANT ALL ON FUNCTION public.handle_new_public_user() TO service_role;


--
-- TOC entry 3752 (class 0 OID 0)
-- Dependencies: 274
-- Name: TABLE challengers; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.challengers TO anon;
GRANT ALL ON TABLE public.challengers TO authenticated;
GRANT ALL ON TABLE public.challengers TO service_role;


--
-- TOC entry 3753 (class 0 OID 0)
-- Dependencies: 275
-- Name: TABLE competitions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.competitions TO anon;
GRANT ALL ON TABLE public.competitions TO authenticated;
GRANT ALL ON TABLE public.competitions TO service_role;


--
-- TOC entry 3754 (class 0 OID 0)
-- Dependencies: 273
-- Name: SEQUENCE competitions_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.competitions_id_seq TO anon;
GRANT ALL ON SEQUENCE public.competitions_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.competitions_id_seq TO service_role;


--
-- TOC entry 3755 (class 0 OID 0)
-- Dependencies: 276
-- Name: SEQUENCE competitions_id_seq1; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.competitions_id_seq1 TO anon;
GRANT ALL ON SEQUENCE public.competitions_id_seq1 TO authenticated;
GRANT ALL ON SEQUENCE public.competitions_id_seq1 TO service_role;


--
-- TOC entry 3756 (class 0 OID 0)
-- Dependencies: 267
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.users TO anon;
GRANT ALL ON TABLE public.users TO authenticated;
GRANT ALL ON TABLE public.users TO service_role;


--
-- TOC entry 3757 (class 0 OID 0)
-- Dependencies: 280
-- Name: TABLE votes; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.votes TO anon;
GRANT ALL ON TABLE public.votes TO authenticated;
GRANT ALL ON TABLE public.votes TO service_role;


--
-- TOC entry 3758 (class 0 OID 0)
-- Dependencies: 279
-- Name: SEQUENCE votes_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.votes_id_seq TO anon;
GRANT ALL ON SEQUENCE public.votes_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.votes_id_seq TO service_role;


--
-- TOC entry 3759 (class 0 OID 0)
-- Dependencies: 278
-- Name: TABLE watching; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.watching TO anon;
GRANT ALL ON TABLE public.watching TO authenticated;
GRANT ALL ON TABLE public.watching TO service_role;


--
-- TOC entry 3760 (class 0 OID 0)
-- Dependencies: 277
-- Name: SEQUENCE watching_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.watching_id_seq TO anon;
GRANT ALL ON SEQUENCE public.watching_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.watching_id_seq TO service_role;


--
-- TOC entry 2418 (class 826 OID 29745)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO service_role;


--
-- TOC entry 2419 (class 826 OID 29746)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO service_role;


--
-- TOC entry 2420 (class 826 OID 29747)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- TOC entry 2421 (class 826 OID 29748)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- TOC entry 2422 (class 826 OID 29749)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO service_role;


--
-- TOC entry 2423 (class 826 OID 29750)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO service_role;


-- Completed on 2023-07-20 19:19:09 EDT

--
-- PostgreSQL database dump complete
--

