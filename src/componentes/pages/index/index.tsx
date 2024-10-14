import React from "react";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { Page } from "./styles";
import { supaString } from "./types";

export const Main = () => {
	const supabaseUrl = supaString(process.env.REACT_APP_SUPABASE_URL);
	const supabaseKey = supaString(process.env.REACT_APP_SUPABASE_KEY);

	const supabase = createClient(supabaseUrl, supabaseKey);

	return <Page></Page>;
};
