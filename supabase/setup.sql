-- 1 - when a user is created we save the user info in Profile
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public."Profile" (id, email, username)
  values (
    new.id, 
    new.email, 

    -- save the user name and if not exist we use the first part of the email
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

-- 2. trigger fn when register
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();