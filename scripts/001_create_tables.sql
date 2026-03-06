-- Create profiles table for user settings
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  theme VARCHAR(10) DEFAULT 'light' CHECK (theme IN ('light', 'dark')),
  mood_colors JSONB DEFAULT '{"sad": "#A3CEF1", "angry": "#F7A1A1", "happy": "#A8E6CF", "other": "#CBA0E3"}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mood_entries table for diary entries
CREATE TABLE IF NOT EXISTS public.mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood VARCHAR(20) NOT NULL CHECK (mood IN ('sad', 'angry', 'happy', 'other')),
  entry_date TIMESTAMP WITH TIME ZONE NOT NULL,
  study_place VARCHAR(100),
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_mood_entries_user_id ON public.mood_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_entries_entry_date ON public.mood_entries(entry_date);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;

-- RLS policies for profiles
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- RLS policies for mood_entries
CREATE POLICY "mood_entries_select_own" ON public.mood_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "mood_entries_insert_own" ON public.mood_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "mood_entries_update_own" ON public.mood_entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "mood_entries_delete_own" ON public.mood_entries FOR DELETE USING (auth.uid() = user_id);
