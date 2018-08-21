
--Создание  базы
CREATE DATABASE tasklist
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'ru_RU.UTF-8'
    LC_CTYPE = 'ru_RU.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
	
	
--Создание таблицы ролей
CREATE TABLE public.roles
(
    caption character varying(50) COLLATE pg_catalog."default" NOT NULL,
    id SERIAL NOT NULL,
    CONSTRAINT pk_roles PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.roles
    OWNER to postgres;
	




--Создание таблицы пользователей

CREATE TABLE public.users
(
    role integer NOT NULL,
    name character varying(50) COLLATE pg_catalog."cv_RU.utf8" NOT NULL,
    pass character varying(50) COLLATE pg_catalog."default",
    id SERIAL NOT NULL,
    salt character varying(50) COLLATE pg_catalog."default" NOT NULL,
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


CREATE INDEX fki_rolo_id
    ON public.users USING btree
    (role)
    TABLESPACE pg_default;
	
--Создание таблицы с задачами

CREATE TABLE public.tasks
(
    task text COLLATE pg_catalog."default" NOT NULL,
    owner integer NOT NULL,
    id SERIAL NOT NULL,
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



CREATE INDEX fki_fk_users
    ON public.tasks USING btree
    (owner)
    TABLESPACE pg_default;


	
--создание ролей 

INSERT INTO roles (caption) VALUES('admins');
INSERT INTO roles (caption) VALUES('users');


	
--создание админа
INSERT INTO users (name, pass,role,salt) VALUES('admin', '22e8585dabda9499272e2a1842f0d2d2','1','bf52de0249a5fb33487b5cb458449d6a');


