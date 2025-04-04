
-- Función para crear un perfil automaticamente cando un usuario se rexistra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    full_name,
    email,
    school_id,
    school_name,
    role,
    specialty,
    approved,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    NEW.raw_user_meta_data->>'school_id',
    NEW.raw_user_meta_data->>'school_name',
    COALESCE(NEW.raw_user_meta_data->>'role', 'docente'),
    NEW.raw_user_meta_data->>'specialty',
    FALSE,
    now(),
    now()
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Eliminar o trigger se xa existe
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Crear o trigger que executa a función cada vez que se crea un usuario
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
