-- Criar tabela de perfis de usuário
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS na tabela profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Usuários podem ver todos os perfis" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Usuários podem atualizar seu próprio perfil" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seu próprio perfil" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Criar tabela de produtos
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  stock_quantity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS na tabela products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para products (todos podem ver produtos)
CREATE POLICY "Produtos são visíveis para todos" 
ON public.products 
FOR SELECT 
USING (true);

-- Criar tabela de carrinho
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Habilitar RLS na tabela cart_items
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para cart_items
CREATE POLICY "Usuários podem ver seus próprios itens do carrinho" 
ON public.cart_items 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seus próprios itens no carrinho" 
ON public.cart_items 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios itens do carrinho" 
ON public.cart_items 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios itens do carrinho" 
ON public.cart_items 
FOR DELETE 
USING (auth.uid() = user_id);

-- Criar função para atualizar timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar triggers para atualizar updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at
  BEFORE UPDATE ON public.cart_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Função para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Inserir alguns produtos de exemplo
INSERT INTO public.products (name, description, price, image_url, stock_quantity) VALUES
('Caneca Artesanal Brasileira', 'Linda caneca de cerâmica com padrões brasileiros tradicionais', 45.90, '/src/assets/product-mug.jpg', 50),
('Colar com Pedras Naturais', 'Colar artesanal com pedras naturais brasileiras', 89.90, '/src/assets/product-jewelry.jpg', 30),
('Sabonetes Naturais Kit', 'Kit com 3 sabonetes artesanais com ingredientes naturais', 32.90, '/src/assets/product-soap.jpg', 100),
('Caneca Premium', 'Versão premium da nossa caneca mais vendida', 65.90, '/src/assets/product-mug.jpg', 25),
('Conjunto de Joias', 'Conjunto completo: colar, brincos e pulseira', 159.90, '/src/assets/product-jewelry.jpg', 15),
('Sabonetes Premium', 'Kit premium com 5 sabonetes de ingredientes especiais', 54.90, '/src/assets/product-soap.jpg', 75);
