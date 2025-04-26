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
      chinese_characters: {
        Row: {
          can_read: boolean | null
          can_write: boolean | null
          character: string
          created_at: string | null
          grade: string
          id: string
          lesson_number: string
        }
        Insert: {
          can_read?: boolean | null
          can_write?: boolean | null
          character: string
          created_at?: string | null
          grade: string
          id?: string
          lesson_number: string
        }
        Update: {
          can_read?: boolean | null
          can_write?: boolean | null
          character?: string
          created_at?: string | null
          grade?: string
          id?: string
          lesson_number?: string
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
      daily_streaks: {
        Row: {
          activities_count: number
          created_at: string
          id: string
          streak_date: string
          user_id: string
        }
        Insert: {
          activities_count?: number
          created_at?: string
          id?: string
          streak_date?: string
          user_id: string
        }
        Update: {
          activities_count?: number
          created_at?: string
          id?: string
          streak_date?: string
          user_id?: string
        }
        Relationships: []
      }
      dictionary_entries: {
        Row: {
          created_at: string
          example: string | null
          id: string
          meaning: string | null
          themes: string[] | null
          word: string
          word_type: string | null
        }
        Insert: {
          created_at?: string
          example?: string | null
          id?: string
          meaning?: string | null
          themes?: string[] | null
          word: string
          word_type?: string | null
        }
        Update: {
          created_at?: string
          example?: string | null
          id?: string
          meaning?: string | null
          themes?: string[] | null
          word?: string
          word_type?: string | null
        }
        Relationships: []
      }
      drafts: {
        Row: {
          content: string
          created_at: string
          id: string
          session_id: string
          version: number
          word_count: number
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          session_id: string
          version?: number
          word_count: number
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          session_id?: string
          version?: number
          word_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "drafts_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "writing_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      feedbacks: {
        Row: {
          created_at: string
          draft_id: string
          id: string
          score_expression: number
          score_language: number
          score_structure: number
          score_theme: number
          session_id: string
          suggestions: Json | null
        }
        Insert: {
          created_at?: string
          draft_id: string
          id?: string
          score_expression: number
          score_language: number
          score_structure: number
          score_theme: number
          session_id: string
          suggestions?: Json | null
        }
        Update: {
          created_at?: string
          draft_id?: string
          id?: string
          score_expression?: number
          score_language?: number
          score_structure?: number
          score_theme?: number
          session_id?: string
          suggestions?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "feedbacks_draft_id_fkey"
            columns: ["draft_id"]
            isOneToOne: false
            referencedRelation: "drafts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedbacks_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "writing_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      images: {
        Row: {
          created_at: string
          description: string | null
          id: string
          metadata: Json | null
          title: string | null
          uploaded_by: string | null
          url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          title?: string | null
          uploaded_by?: string | null
          url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          title?: string | null
          uploaded_by?: string | null
          url?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          sender: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          sender: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          sender?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "writing_sessions"
            referencedColumns: ["id"]
          },
        ]
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
      recommendations: {
        Row: {
          entry_id: string
          id: string
          recommended_at: string
          session_id: string
        }
        Insert: {
          entry_id: string
          id?: string
          recommended_at?: string
          session_id: string
        }
        Update: {
          entry_id?: string
          id?: string
          recommended_at?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_entry_id_fkey"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "dictionary_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendations_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "writing_sessions"
            referencedColumns: ["id"]
          },
        ]
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
      user_activities: {
        Row: {
          activity_details: Json | null
          activity_type: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          activity_details?: Json | null
          activity_type: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          activity_details?: Json | null
          activity_type?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_activities_tracking: {
        Row: {
          activity_type: Database["public"]["Enums"]["activity_category"]
          created_at: string
          details: Json | null
          id: string
          user_id: string
        }
        Insert: {
          activity_type: Database["public"]["Enums"]["activity_category"]
          created_at?: string
          details?: Json | null
          id?: string
          user_id: string
        }
        Update: {
          activity_type?: Database["public"]["Enums"]["activity_category"]
          created_at?: string
          details?: Json | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_behavior_tracking: {
        Row: {
          action_details: Json | null
          activity_type: Database["public"]["Enums"]["user_activity_type"]
          component_id: string | null
          created_at: string
          duration: number | null
          id: string
          ip_address: string | null
          metadata: Json | null
          page_url: string | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_details?: Json | null
          activity_type: Database["public"]["Enums"]["user_activity_type"]
          component_id?: string | null
          created_at?: string
          duration?: number | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_details?: Json | null
          activity_type?: Database["public"]["Enums"]["user_activity_type"]
          component_id?: string | null
          created_at?: string
          duration?: number | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
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
      writing_sessions: {
        Row: {
          created_at: string
          current_stage: string
          essay_type: string | null
          grade: string | null
          id: string
          image_id: string | null
          instructions: string | null
          is_active: boolean
          title: string | null
          updated_at: string
          user_id: string
          word_count: number | null
        }
        Insert: {
          created_at?: string
          current_stage?: string
          essay_type?: string | null
          grade?: string | null
          id?: string
          image_id?: string | null
          instructions?: string | null
          is_active?: boolean
          title?: string | null
          updated_at?: string
          user_id: string
          word_count?: number | null
        }
        Update: {
          created_at?: string
          current_stage?: string
          essay_type?: string | null
          grade?: string | null
          id?: string
          image_id?: string | null
          instructions?: string | null
          is_active?: boolean
          title?: string | null
          updated_at?: string
          user_id?: string
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "writing_sessions_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
        ]
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
      user_behavior_daily_summary: {
        Row: {
          activity_count: number | null
          activity_type:
            | Database["public"]["Enums"]["user_activity_type"]
            | null
          avg_duration: number | null
          day: string | null
          first_activity: string | null
          last_activity: string | null
          user_id: string | null
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
      track_user_behavior: {
        Args: {
          p_user_id: string
          p_activity_type: Database["public"]["Enums"]["user_activity_type"]
          p_page_url?: string
          p_component_id?: string
          p_action_details?: Json
          p_metadata?: Json
          p_session_id?: string
          p_duration?: number
        }
        Returns: string
      }
    }
    Enums: {
      activity_category:
        | "video_watch"
        | "question_practice"
        | "homework_complete"
        | "mock_exam"
        | "ai_tutor_use"
        | "quiz_complete"
      user_activity_type:
        | "page_view"
        | "login"
        | "logout"
        | "video_watch"
        | "question_practice"
        | "homework_complete"
        | "mock_exam"
        | "ai_tutor_use"
        | "quiz_complete"
        | "favorite_add"
        | "favorite_remove"
        | "search"
        | "click"
        | "download"
        | "share"
        | "time_spent"
        | "scroll_depth"
        | "form_submit"
        | "error_encounter"
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
    Enums: {
      activity_category: [
        "video_watch",
        "question_practice",
        "homework_complete",
        "mock_exam",
        "ai_tutor_use",
        "quiz_complete",
      ],
      user_activity_type: [
        "page_view",
        "login",
        "logout",
        "video_watch",
        "question_practice",
        "homework_complete",
        "mock_exam",
        "ai_tutor_use",
        "quiz_complete",
        "favorite_add",
        "favorite_remove",
        "search",
        "click",
        "download",
        "share",
        "time_spent",
        "scroll_depth",
        "form_submit",
        "error_encounter",
      ],
    },
  },
} as const
