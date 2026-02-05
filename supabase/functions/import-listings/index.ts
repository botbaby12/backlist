import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ListingInput {
  title: string
  price: number
  estimated_value: number
  mileage: number
  location: string
  distance?: string
  posted_date?: string
  source: 'craigslist' | 'facebook' | 'carscom' | 'autotrader'
  image_url?: string
  original_url: string
  deal_grade: 'steal' | 'pass'
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    if (req.method === 'POST') {
      const body = await req.json()
      const listings: ListingInput[] = Array.isArray(body) ? body : body.listings

      if (!listings || !Array.isArray(listings)) {
        return new Response(
          JSON.stringify({ error: 'Request body must be an array of listings or { listings: [...] }' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      console.log(`Importing ${listings.length} listings...`)

      // Validate required fields
      for (let i = 0; i < listings.length; i++) {
        const listing = listings[i]
        if (!listing.title || !listing.price || !listing.original_url || !listing.source || !listing.deal_grade) {
          return new Response(
            JSON.stringify({ 
              error: `Listing at index ${i} is missing required fields (title, price, original_url, source, deal_grade)`,
              listing 
            }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
      }

      // Upsert listings (update if original_url exists, insert if new)
      const { data, error } = await supabase
        .from('listings')
        .upsert(listings, { 
          onConflict: 'original_url',
          ignoreDuplicates: false 
        })
        .select()

      if (error) {
        console.error('Database error:', error)
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      console.log(`Successfully imported ${data?.length || 0} listings`)

      return new Response(
        JSON.stringify({ 
          success: true, 
          imported: data?.length || 0,
          listings: data 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (req.method === 'DELETE') {
      // Clear all listings
      const { error } = await supabase
        .from('listings')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify({ success: true, message: 'All listings cleared' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
