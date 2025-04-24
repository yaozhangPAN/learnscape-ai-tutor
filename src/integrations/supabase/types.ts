export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      access_codes: {
        Row: {
          code: string
          course_id: string
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
        }
        Insert: {
          code: string
          course_id: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
        }
        Update: {
          code?: string
          course_id?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
        }
        Relationships: []
      }
      beta_signups: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      course_enrollments: {
        Row: {
          class_type: string
          course_id: string
          created_at: string
          id: string
          user_id: string | null
        }
        Insert: {
          class_type?: string
          course_id: string
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Update: {
          class_type?: string
          course_id?: string
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      course_statistics: {
        Row: {
          class_type: string
          course_id: string
          created_at: string
          id: string
          updated_at: string
          views: number
        }
        Insert: {
          class_type: string
          course_id: string
          created_at?: string
          id?: string
          updated_at?: string
          views?: number
        }
        Update: {
          class_type?: string
          course_id?: string
          created_at?: string
          id?: string
          updated_at?: string
          views?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          name: string | null
          updated_at: string
          user_type: string | null
        }
        Insert: {
          created_at?: string
          id: string
          name?: string | null
          updated_at?: string
          user_type?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          updated_at?: string
          user_type?: string | null
        }
        Relationships: []
      }
      purchased_content: {
        Row: {
          content_id: string
          content_type: string
          currency: string
          id: string
          payment_reference: string | null
          price: number
          purchase_date: string
          user_id: string
        }
        Insert: {
          content_id: string
          content_type: string
          currency?: string
          id?: string
          payment_reference?: string | null
          price: number
          purchase_date?: string
          user_id: string
        }
        Update: {
          content_id?: string
          content_type?: string
          currency?: string
          id?: string
          payment_reference?: string | null
          price?: number
          purchase_date?: string
          user_id?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          content: Json | null
          created_at: string
          id: string
          level: string | null
          subject: string | null
          term: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string
          id: string
          level?: string | null
          subject?: string | null
          term?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string
          id?: string
          level?: string | null
          subject?: string | null
          term?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          currency: string
          end_date: string
          id: string
          payment_reference: string | null
          price: number
          start_date: string
          status: string
          subscription_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string
          end_date: string
          id?: string
          payment_reference?: string | null
          price: number
          start_date?: string
          status: string
          subscription_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string
          end_date?: string
          id?: string
          payment_reference?: string | null
          price?: number
          start_date?: string
          status?: string
          subscription_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      video_files: {
        Row: {
          course_id: string
          created_at: string
          file_name: string
          file_size: number
          file_url: string
          id: string
          uploaded_by: string
        }
        Insert: {
          course_id: string
          created_at?: string
          file_name: string
          file_size: number
          file_url: string
          id?: string
          uploaded_by: string
        }
        Update: {
          course_id?: string
          created_at?: string
          file_name?: string
          file_size?: number
          file_url?: string
          id?: string
          uploaded_by?: string
        }
        Relationships: []
      }
    }
    Views: {
      course_combined_stats: {
        Row: {
          class_type: string | null
          course_id: string | null
          enrollment_count: number | null
          views: number | null
        }
        Relationships: []
      }
      zoom_course_enrollment_counts: {
        Row: {
          course_id: string | null
          enrollment_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_premium_subscription: {
        Args: { user_id: number } | { user_uuid: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
