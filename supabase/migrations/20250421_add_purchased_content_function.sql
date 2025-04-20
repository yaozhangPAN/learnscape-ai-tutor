
-- Function to add purchased content with elevated privileges
CREATE OR REPLACE FUNCTION public.add_purchased_content(
  p_user_id UUID,
  p_content_id TEXT,
  p_content_type TEXT,
  p_price NUMERIC DEFAULT 0,
  p_currency TEXT DEFAULT 'SGD',
  p_payment_reference TEXT DEFAULT NULL
) 
RETURNS SETOF purchased_content
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if entry already exists to avoid duplicates
  IF EXISTS (
    SELECT 1 FROM public.purchased_content 
    WHERE user_id = p_user_id 
    AND content_id = p_content_id 
    AND content_type = p_content_type
  ) THEN
    RETURN QUERY SELECT * FROM public.purchased_content 
      WHERE user_id = p_user_id 
      AND content_id = p_content_id 
      AND content_type = p_content_type;
    RETURN;
  END IF;

  -- Insert new record
  RETURN QUERY INSERT INTO public.purchased_content (
    user_id,
    content_id,
    content_type,
    price,
    currency,
    payment_reference
  ) VALUES (
    p_user_id,
    p_content_id,
    p_content_type,
    p_price,
    p_currency,
    p_payment_reference
  )
  RETURNING *;
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.add_purchased_content TO authenticated;
GRANT EXECUTE ON FUNCTION public.add_purchased_content TO anon;
