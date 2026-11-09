import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kpqduevpygqwhsdcpins.supabase.co'
const supabaseKey = 'sb_publishable_nx-usoevSl0M7ZXnf4VGTg_mRdTg_5H'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)
