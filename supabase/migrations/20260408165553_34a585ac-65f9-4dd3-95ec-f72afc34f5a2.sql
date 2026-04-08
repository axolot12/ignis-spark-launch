
CREATE TABLE public.download_counter (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE public.download_counter ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read download count" ON public.download_counter FOR SELECT USING (true);
CREATE POLICY "Anyone can update download count" ON public.download_counter FOR UPDATE USING (true) WITH CHECK (true);

INSERT INTO public.download_counter (count) VALUES (0);
