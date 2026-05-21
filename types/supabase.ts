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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      contacto: {
        Row: {
          apellido: string
          asunto: string
          correo: string
          created_at: string
          id: string
          mensaje: string | null
          nombre: string
          origen: string
          telefono: string
        }
        Insert: {
          apellido: string
          asunto: string
          correo: string
          created_at?: string
          id?: string
          mensaje?: string | null
          nombre: string
          origen?: string
          telefono: string
        }
        Update: {
          apellido?: string
          asunto?: string
          correo?: string
          created_at?: string
          id?: string
          mensaje?: string | null
          nombre?: string
          origen?: string
          telefono?: string
        }
        Relationships: []
      }
      dchplm_eat_categories: {
        Row: {
          created_at: string | null
          emoji: string | null
          id: string
          slug: string
          title: string
        }
        Insert: {
          created_at?: string | null
          emoji?: string | null
          id?: string
          slug: string
          title: string
        }
        Update: {
          created_at?: string | null
          emoji?: string | null
          id?: string
          slug?: string
          title?: string
        }
        Relationships: []
      }
      dchplm_eat_clients: {
        Row: {
          active: boolean
          address: string | null
          category_id: string | null
          created_at: string
          expiration_date: string | null
          id: string
          keywords: string | null
          lat: string | null
          lng: string | null
          logo_url: string | null
          name: string | null
          on_the_map: boolean
          phone: string | null
        }
        Insert: {
          active?: boolean
          address?: string | null
          category_id?: string | null
          created_at?: string
          expiration_date?: string | null
          id?: string
          keywords?: string | null
          lat?: string | null
          lng?: string | null
          logo_url?: string | null
          name?: string | null
          on_the_map?: boolean
          phone?: string | null
        }
        Update: {
          active?: boolean
          address?: string | null
          category_id?: string | null
          created_at?: string
          expiration_date?: string | null
          id?: string
          keywords?: string | null
          lat?: string | null
          lng?: string | null
          logo_url?: string | null
          name?: string | null
          on_the_map?: boolean
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dchplm_eat_clients_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "dchplm_eat_clients_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      dchplm_eat_clients_categories: {
        Row: {
          created_at: string
          id: string
          name: string | null
          slug: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          slug?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          slug?: string | null
        }
        Relationships: []
      }
      dchplm_eat_reviews: {
        Row: {
          active: boolean | null
          category_id: string
          client_id: string | null
          created_at: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          lat: string | null
          lng: string | null
          location: string
          name: string
          on_the_map: boolean | null
          phone: string | null
          video_id: string | null
        }
        Insert: {
          active?: boolean | null
          category_id: string
          client_id?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          lat?: string | null
          lng?: string | null
          location: string
          name: string
          on_the_map?: boolean | null
          phone?: string | null
          video_id?: string | null
        }
        Update: {
          active?: boolean | null
          category_id?: string
          client_id?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          lat?: string | null
          lng?: string | null
          location?: string
          name?: string
          on_the_map?: boolean | null
          phone?: string | null
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dchplm_eat_reviews_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "dchplm_eat_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dchplm_eat_reviews_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "dchplm_eat_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      dchplm_menu_categories: {
        Row: {
          active: boolean
          created_at: string | null
          id: string
          image_url: string | null
          name: string
        }
        Insert: {
          active?: boolean
          created_at?: string | null
          id?: string
          image_url?: string | null
          name: string
        }
        Update: {
          active?: boolean
          created_at?: string | null
          id?: string
          image_url?: string | null
          name?: string
        }
        Relationships: []
      }
      dchplm_menu_category_assignments: {
        Row: {
          category_id: string
          display_order: number
          menu_id: string
        }
        Insert: {
          category_id: string
          display_order?: number
          menu_id: string
        }
        Update: {
          category_id?: string
          display_order?: number
          menu_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dchplm_menu_category_assignments_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menu_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dchplm_menu_category_assignments_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menus"
            referencedColumns: ["id"]
          },
        ]
      }
      dchplm_menu_client_subscriptions: {
        Row: {
          amount_paid: number
          billing_period: string
          client_id: string
          created_at: string | null
          end_date: string | null
          id: string
          menu_id: string
          plan_id: string
          start_date: string
        }
        Insert: {
          amount_paid?: number
          billing_period: string
          client_id: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          menu_id: string
          plan_id: string
          start_date: string
        }
        Update: {
          amount_paid?: number
          billing_period?: string
          client_id?: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          menu_id?: string
          plan_id?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "dchplm_menu_client_subscriptions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menu_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dchplm_menu_client_subscriptions_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dchplm_menu_client_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menu_subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      dchplm_menu_clients: {
        Row: {
          auth_user_id: string | null
          created_at: string | null
          email: string
          id: string
          name: string
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      dchplm_menu_item_variant_options: {
        Row: {
          additional_price: number
          display_order: number
          id: string
          name: string
          variant_id: string
        }
        Insert: {
          additional_price?: number
          display_order?: number
          id?: string
          name: string
          variant_id: string
        }
        Update: {
          additional_price?: number
          display_order?: number
          id?: string
          name?: string
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dchplm_menu_item_variant_options_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menu_item_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      dchplm_menu_item_variants: {
        Row: {
          display_order: number
          id: string
          is_required: boolean
          item_id: string
          multi_select: boolean
          name: string
        }
        Insert: {
          display_order?: number
          id?: string
          is_required?: boolean
          item_id: string
          multi_select?: boolean
          name: string
        }
        Update: {
          display_order?: number
          id?: string
          is_required?: boolean
          item_id?: string
          multi_select?: boolean
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "dchplm_menu_item_variants_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      dchplm_menu_items: {
        Row: {
          active: boolean
          base_price: number
          category_id: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_featured: boolean
          menu_id: string
          name: string
        }
        Insert: {
          active?: boolean
          base_price?: number
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          menu_id: string
          name: string
        }
        Update: {
          active?: boolean
          base_price?: number
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          menu_id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "dchplm_menu_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menu_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dchplm_menu_items_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menus"
            referencedColumns: ["id"]
          },
        ]
      }
      dchplm_menu_subscription_plans: {
        Row: {
          active: boolean
          allow_social_links: boolean
          can_customize_brand: boolean
          created_at: string | null
          has_ads: boolean
          id: string
          max_featured: number
          max_items: number
          name: string
          price_monthly: number
          price_yearly: number
        }
        Insert: {
          active?: boolean
          allow_social_links?: boolean
          can_customize_brand?: boolean
          created_at?: string | null
          has_ads?: boolean
          id?: string
          max_featured?: number
          max_items?: number
          name: string
          price_monthly?: number
          price_yearly?: number
        }
        Update: {
          active?: boolean
          allow_social_links?: boolean
          can_customize_brand?: boolean
          created_at?: string | null
          has_ads?: boolean
          id?: string
          max_featured?: number
          max_items?: number
          name?: string
          price_monthly?: number
          price_yearly?: number
        }
        Relationships: []
      }
      dchplm_menus: {
        Row: {
          active: boolean
          address: string | null
          banner_url: string | null
          client_id: string
          created_at: string | null
          description: string | null
          facebook_url: string | null
          hours_json: Json | null
          id: string
          instagram_url: string | null
          lat: string | null
          lng: string | null
          logo_url: string | null
          name: string
          plan_id: string | null
          primary_color: string | null
          secondary_color: string | null
          slug: string
          tiktok_url: string | null
          whatsapp_phone: string | null
        }
        Insert: {
          active?: boolean
          address?: string | null
          banner_url?: string | null
          client_id: string
          created_at?: string | null
          description?: string | null
          facebook_url?: string | null
          hours_json?: Json | null
          id?: string
          instagram_url?: string | null
          lat?: string | null
          lng?: string | null
          logo_url?: string | null
          name: string
          plan_id?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          slug: string
          tiktok_url?: string | null
          whatsapp_phone?: string | null
        }
        Update: {
          active?: boolean
          address?: string | null
          banner_url?: string | null
          client_id?: string
          created_at?: string | null
          description?: string | null
          facebook_url?: string | null
          hours_json?: Json | null
          id?: string
          instagram_url?: string | null
          lat?: string | null
          lng?: string | null
          logo_url?: string | null
          name?: string
          plan_id?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          slug?: string
          tiktok_url?: string | null
          whatsapp_phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dchplm_menus_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menu_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dchplm_menus_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menu_subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      slugify: { Args: { v_text: string }; Returns: string }
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
