-- Database: tasklist

-- DROP DATABASE tasklist;

CREATE DATABASE tasklist
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'ru_RU.UTF-8'
    LC_CTYPE = 'ru_RU.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;


-- Table: public.roles

CREATE TABLE public.roles
(
    caption character varying(50) COLLATE pg_catalog."default" NOT NULL,
    id integer NOT NULL DEFAULT nextval('roles_id_seq'::regclass),
    CONSTRAINT pk_roles PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.roles
    OWNER to postgres;
	

-- Table: public.users

CREATE TABLE public.users
(
    role integer NOT NULL,
    name character varying(50) COLLATE pg_catalog."cv_RU.utf8" NOT NULL DEFAULT USER,
    pass character varying(50) COLLATE pg_catalog."default",
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    CONSTRAINT pk_users PRIMARY KEY (id),
    CONSTRAINT uk_name UNIQUE (name)
,
    CONSTRAINT fk_role FOREIGN KEY (role)
        REFERENCES public.roles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;

-- Index: fki_rolo_id

-- DROP INDEX public.fki_rolo_id;

CREATE INDEX fki_rolo_id
    ON public.users USING btree
    (role)
    TABLESPACE pg_default;

	
-- Table: public.tasks


CREATE TABLE public.tasks
(
    task text COLLATE pg_catalog."default" NOT NULL,
    owner integer NOT NULL,
    id integer NOT NULL DEFAULT nextval('tasks_id_seq'::regclass),
    iscompleted boolean NOT NULL,
    priority integer NOT NULL,
    CONSTRAINT pk_tasks PRIMARY KEY (id),
    CONSTRAINT uk_owner_task UNIQUE (owner, task)
,
    CONSTRAINT fk_users FOREIGN KEY (owner)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tasks
    OWNER to postgres;

-- Index: fki_fk_users

-- DROP INDEX public.fki_fk_users;

CREATE INDEX fki_fk_users
    ON public.tasks USING btree
    (owner)
    TABLESPACE pg_default;	