export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          title: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          title: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          streak: number
          total_points: number
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          streak?: number
          total_points?: number
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          streak?: number
          total_points?: number
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          correct_index: number
          created_at: string
          id: string
          options: string[]
          question_text: string
          verification_id: string
        }
        Insert: {
          correct_index: number
          created_at?: string
          id?: string
          options: string[]
          question_text: string
          verification_id: string
        }
        Update: {
          correct_index?: number
          created_at?: string
          id?: string
          options?: string[]
          question_text?: string
          verification_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_verification_id_fkey"
            columns: ["verification_id"]
            isOneToOne: false
            referencedRelation: "step_verifications"
            referencedColumns: ["id"]
          },
        ]
      }
      roadmap_steps: {
        Row: {
          content: string | null
          created_at: string
          id: string
          order_index: number
          parent_step_id: string | null
          roadmap_id: string
          title: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          order_index?: number
          parent_step_id?: string | null
          roadmap_id: string
          title: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          order_index?: number
          parent_step_id?: string | null
          roadmap_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "roadmap_steps_parent_step_id_fkey"
            columns: ["parent_step_id"]
            isOneToOne: false
            referencedRelation: "roadmap_steps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roadmap_steps_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "roadmaps"
            referencedColumns: ["id"]
          },
        ]
      }
      roadmaps: {
        Row: {
          created_at: string
          description: string | null
          id: string
          slug: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          slug: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          slug?: string
          title?: string
        }
        Relationships: []
      }
      solutions: {
        Row: {
          code: string
          created_at: string
          id: string
          language: string
          result: string
          stderr: string | null
          stdout: string | null
          task_instance_id: string
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          language?: string
          result: string
          stderr?: string | null
          stdout?: string | null
          task_instance_id: string
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          language?: string
          result?: string
          stderr?: string | null
          stdout?: string | null
          task_instance_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "solutions_task_instance_id_fkey"
            columns: ["task_instance_id"]
            isOneToOne: false
            referencedRelation: "task_instances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solutions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      step_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          status: string
          step_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          status?: string
          step_id: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          status?: string
          step_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "step_progress_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "roadmap_steps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "step_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      step_verifications: {
        Row: {
          created_at: string
          id: string
          step_id: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          step_id: string
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          step_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "step_verifications_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "roadmap_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      task_instances: {
        Row: {
          assigned_at: string
          earned_points: number | null
          id: string
          solved_at: string | null
          status: string
          step_id: string
          task_template_id: string
          user_id: string
        }
        Insert: {
          assigned_at?: string
          earned_points?: number | null
          id?: string
          solved_at?: string | null
          status?: string
          step_id: string
          task_template_id: string
          user_id: string
        }
        Update: {
          assigned_at?: string
          earned_points?: number | null
          id?: string
          solved_at?: string | null
          status?: string
          step_id?: string
          task_template_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_instances_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "roadmap_steps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_instances_task_template_id_fkey"
            columns: ["task_template_id"]
            isOneToOne: false
            referencedRelation: "task_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_instances_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      task_templates: {
        Row: {
          created_at: string
          description: string
          difficulty: string
          id: string
          starter_code: string | null
          step_id: string
          tests_json: Json
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          difficulty: string
          id?: string
          starter_code?: string | null
          step_id: string
          tests_json?: Json
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          difficulty?: string
          id?: string
          starter_code?: string | null
          step_id?: string
          tests_json?: Json
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_templates_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "roadmap_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string
          id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          id?: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_leaderboard_by_period: {
        Args: { period_type: string; result_limit?: number }
        Returns: {
          period_points: number
          user_id: string
        }[]
      }
      increment_user_points: {
        Args: { points_to_add: number; user_id: string }
        Returns: undefined
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
