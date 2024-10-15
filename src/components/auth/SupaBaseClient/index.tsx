import { supaString } from './types';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = supaString(process.env.REACT_APP_SUPABASE_URL);
const supabaseKey = supaString(process.env.REACT_APP_SUPABASE_KEY);

export const supabase = createClient(supabaseUrl, supabaseKey);
