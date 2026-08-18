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
          deleted_at: string | null
          id: string
          leida_at: string | null
          leida_por: string | null
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
          deleted_at?: string | null
          id?: string
          leida_at?: string | null
          leida_por?: string | null
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
          deleted_at?: string | null
          id?: string
          leida_at?: string | null
          leida_por?: string | null
          mensaje?: string | null
          nombre?: string
          origen?: string
          telefono?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacto_leida_por_fkey"
            columns: ["leida_por"]
            isOneToOne: false
            referencedRelation: "crm_usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_client_projects: {
        Row: {
          client_id: string
          created_at: string
          deleted_at: string | null
          description: string | null
          end_date: string | null
          id: string
          name: string
          notes: string | null
          start_date: string | null
          status: string
          type_id: string | null
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          notes?: string | null
          start_date?: string | null
          status?: string
          type_id?: string | null
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          notes?: string | null
          start_date?: string | null
          status?: string
          type_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_client_projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "crm_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_client_projects_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "crm_project_types"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_clients: {
        Row: {
          city: string | null
          company: string
          country: string | null
          created_at: string
          deleted_at: string | null
          email: string | null
          facebook_url: string | null
          first_name: string
          id: string
          instagram_url: string | null
          last_name: string
          neighborhood: string | null
          notes: string | null
          phone: string | null
          postal_code: string | null
          second_last_name: string | null
          state: string | null
          street: string | null
          street_number: string | null
          tiktok_url: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          city?: string | null
          company: string
          country?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          facebook_url?: string | null
          first_name: string
          id?: string
          instagram_url?: string | null
          last_name: string
          neighborhood?: string | null
          notes?: string | null
          phone?: string | null
          postal_code?: string | null
          second_last_name?: string | null
          state?: string | null
          street?: string | null
          street_number?: string | null
          tiktok_url?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          city?: string | null
          company?: string
          country?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          facebook_url?: string | null
          first_name?: string
          id?: string
          instagram_url?: string | null
          last_name?: string
          neighborhood?: string | null
          notes?: string | null
          phone?: string | null
          postal_code?: string | null
          second_last_name?: string | null
          state?: string | null
          street?: string | null
          street_number?: string | null
          tiktok_url?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      crm_notificaciones: {
        Row: {
          created_at: string
          cuerpo: string | null
          deleted_at: string | null
          enlace: string | null
          id: string
          origen: string
          ref_id: string
          ref_tabla: string
          tipo: string
          titulo: string
        }
        Insert: {
          created_at?: string
          cuerpo?: string | null
          deleted_at?: string | null
          enlace?: string | null
          id?: string
          origen: string
          ref_id: string
          ref_tabla: string
          tipo: string
          titulo: string
        }
        Update: {
          created_at?: string
          cuerpo?: string | null
          deleted_at?: string | null
          enlace?: string | null
          id?: string
          origen?: string
          ref_id?: string
          ref_tabla?: string
          tipo?: string
          titulo?: string
        }
        Relationships: []
      }
      crm_notificaciones_vistas: {
        Row: {
          notificacion_id: string
          usuario_id: string
          vista_at: string
        }
        Insert: {
          notificacion_id: string
          usuario_id: string
          vista_at?: string
        }
        Update: {
          notificacion_id?: string
          usuario_id?: string
          vista_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_notificaciones_vistas_notificacion_id_fkey"
            columns: ["notificacion_id"]
            isOneToOne: false
            referencedRelation: "crm_notificaciones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_notificaciones_vistas_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "crm_usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_payment_menu_details: {
        Row: {
          billing_period: string
          created_at: string
          menu_client_id: string
          payment_id: string
          period_end: string | null
          period_start: string
          plan_id: string
          subscription_id: string | null
        }
        Insert: {
          billing_period: string
          created_at?: string
          menu_client_id: string
          payment_id: string
          period_end?: string | null
          period_start: string
          plan_id: string
          subscription_id?: string | null
        }
        Update: {
          billing_period?: string
          created_at?: string
          menu_client_id?: string
          payment_id?: string
          period_end?: string | null
          period_start?: string
          plan_id?: string
          subscription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_payment_menu_details_menu_client_id_fkey"
            columns: ["menu_client_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menu_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_payment_menu_details_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: true
            referencedRelation: "crm_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_payment_menu_details_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menu_subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_payment_menu_details_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menu_client_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_payments: {
        Row: {
          amount: number
          client_id: string
          concept: string
          created_at: string
          currency: string
          deleted_at: string | null
          due_date: string | null
          folio: string
          id: string
          method: Database["public"]["Enums"]["crm_payment_method"] | null
          next_charge_date: string | null
          notes: string | null
          paid_at: string | null
          project_id: string | null
          recurrence: Database["public"]["Enums"]["crm_payment_recurrence"]
          reference: string | null
          registered_by: string | null
          status: Database["public"]["Enums"]["crm_payment_status"]
          updated_at: string
        }
        Insert: {
          amount: number
          client_id: string
          concept: string
          created_at?: string
          currency?: string
          deleted_at?: string | null
          due_date?: string | null
          folio?: string
          id?: string
          method?: Database["public"]["Enums"]["crm_payment_method"] | null
          next_charge_date?: string | null
          notes?: string | null
          paid_at?: string | null
          project_id?: string | null
          recurrence?: Database["public"]["Enums"]["crm_payment_recurrence"]
          reference?: string | null
          registered_by?: string | null
          status?: Database["public"]["Enums"]["crm_payment_status"]
          updated_at?: string
        }
        Update: {
          amount?: number
          client_id?: string
          concept?: string
          created_at?: string
          currency?: string
          deleted_at?: string | null
          due_date?: string | null
          folio?: string
          id?: string
          method?: Database["public"]["Enums"]["crm_payment_method"] | null
          next_charge_date?: string | null
          notes?: string | null
          paid_at?: string | null
          project_id?: string | null
          recurrence?: Database["public"]["Enums"]["crm_payment_recurrence"]
          reference?: string | null
          registered_by?: string | null
          status?: Database["public"]["Enums"]["crm_payment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_payments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "crm_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_payments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "crm_client_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_payments_registered_by_fkey"
            columns: ["registered_by"]
            isOneToOne: false
            referencedRelation: "crm_usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_project_types: {
        Row: {
          active: boolean
          created_at: string
          deleted_at: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          deleted_at?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          active?: boolean
          created_at?: string
          deleted_at?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      crm_push_suscripciones: {
        Row: {
          auth: string
          created_at: string
          endpoint: string
          id: string
          p256dh: string
          ultimo_error: string | null
          ultimo_intento: string | null
          user_agent: string | null
          usuario_id: string
        }
        Insert: {
          auth: string
          created_at?: string
          endpoint: string
          id?: string
          p256dh: string
          ultimo_error?: string | null
          ultimo_intento?: string | null
          user_agent?: string | null
          usuario_id: string
        }
        Update: {
          auth?: string
          created_at?: string
          endpoint?: string
          id?: string
          p256dh?: string
          ultimo_error?: string | null
          ultimo_intento?: string | null
          user_agent?: string | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_push_suscripciones_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "crm_usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_uso_storage: {
        Row: {
          bytes: number
          deleted_at: string | null
          fecha: string
          id: string
          medido_at: string
          menu_id: string | null
          menu_ref: string | null
          objetos: number
          producto: string
        }
        Insert: {
          bytes?: number
          deleted_at?: string | null
          fecha?: string
          id?: string
          medido_at?: string
          menu_id?: string | null
          menu_ref?: string | null
          objetos?: number
          producto: string
        }
        Update: {
          bytes?: number
          deleted_at?: string | null
          fecha?: string
          id?: string
          medido_at?: string
          menu_id?: string | null
          menu_ref?: string | null
          objetos?: number
          producto?: string
        }
        Relationships: []
      }
      crm_usuarios: {
        Row: {
          ape_mat: string | null
          ape_pat: string
          created_at: string
          email: string
          id: string
          last_login: string | null
          nombre: string
          status: Database["public"]["Enums"]["crm_user_status"]
          updated_at: string
          user_role: Database["public"]["Enums"]["crm_user_role"]
        }
        Insert: {
          ape_mat?: string | null
          ape_pat: string
          created_at?: string
          email: string
          id: string
          last_login?: string | null
          nombre: string
          status?: Database["public"]["Enums"]["crm_user_status"]
          updated_at?: string
          user_role?: Database["public"]["Enums"]["crm_user_role"]
        }
        Update: {
          ape_mat?: string | null
          ape_pat?: string
          created_at?: string
          email?: string
          id?: string
          last_login?: string | null
          nombre?: string
          status?: Database["public"]["Enums"]["crm_user_status"]
          updated_at?: string
          user_role?: Database["public"]["Enums"]["crm_user_role"]
        }
        Relationships: []
      }
      dchplm_eat_clients: {
        Row: {
          active: boolean
          address: string | null
          category_id: string | null
          created_at: string
          crm_client_id: string | null
          deleted_at: string | null
          expiration_date: string | null
          id: string
          keywords: string | null
          lat: string | null
          lng: string | null
          logo_url: string | null
          menu_id: string | null
          name: string | null
          on_the_map: boolean
          phone: string | null
        }
        Insert: {
          active?: boolean
          address?: string | null
          category_id?: string | null
          created_at?: string
          crm_client_id?: string | null
          deleted_at?: string | null
          expiration_date?: string | null
          id?: string
          keywords?: string | null
          lat?: string | null
          lng?: string | null
          logo_url?: string | null
          menu_id?: string | null
          name?: string | null
          on_the_map?: boolean
          phone?: string | null
        }
        Update: {
          active?: boolean
          address?: string | null
          category_id?: string | null
          created_at?: string
          crm_client_id?: string | null
          deleted_at?: string | null
          expiration_date?: string | null
          id?: string
          keywords?: string | null
          lat?: string | null
          lng?: string | null
          logo_url?: string | null
          menu_id?: string | null
          name?: string | null
          on_the_map?: boolean
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dchplm_eat_clients_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menu_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dchplm_eat_clients_crm_client_id_fkey"
            columns: ["crm_client_id"]
            isOneToOne: false
            referencedRelation: "crm_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dchplm_eat_clients_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menus"
            referencedColumns: ["id"]
          },
        ]
      }
      dchplm_eat_reviews: {
        Row: {
          active: boolean | null
          category_id: string
          client_id: string | null
          created_at: string | null
          deleted_at: string | null
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
          deleted_at?: string | null
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
          deleted_at?: string | null
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
            referencedRelation: "dchplm_menu_categories"
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
          deleted_at: string | null
          id: string
          image_url: string | null
          name: string
          orden_grupo: number
          slug: string
        }
        Insert: {
          active?: boolean
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          image_url?: string | null
          name: string
          orden_grupo?: number
          slug: string
        }
        Update: {
          active?: boolean
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          image_url?: string | null
          name?: string
          orden_grupo?: number
          slug?: string
        }
        Relationships: []
      }
      dchplm_menu_client_subscriptions: {
        Row: {
          amount_paid: number
          billing_period: string
          client_id: string
          created_at: string | null
          deleted_at: string | null
          end_date: string | null
          id: string
          plan_id: string
          start_date: string
        }
        Insert: {
          amount_paid?: number
          billing_period: string
          client_id: string
          created_at?: string | null
          deleted_at?: string | null
          end_date?: string | null
          id?: string
          plan_id: string
          start_date: string
        }
        Update: {
          amount_paid?: number
          billing_period?: string
          client_id?: string
          created_at?: string | null
          deleted_at?: string | null
          end_date?: string | null
          id?: string
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
          acceso_activo: boolean
          age: number | null
          ape_mat: string | null
          ape_pat: string | null
          auth_user_id: string | null
          created_at: string | null
          crm_client_id: string | null
          deleted_at: string | null
          email: string
          id: string
          name: string
          onboarding_paso: number
          onboarding_terminado_at: string | null
          password_temporal: boolean
        }
        Insert: {
          acceso_activo?: boolean
          age?: number | null
          ape_mat?: string | null
          ape_pat?: string | null
          auth_user_id?: string | null
          created_at?: string | null
          crm_client_id?: string | null
          deleted_at?: string | null
          email: string
          id?: string
          name: string
          onboarding_paso?: number
          onboarding_terminado_at?: string | null
          password_temporal?: boolean
        }
        Update: {
          acceso_activo?: boolean
          age?: number | null
          ape_mat?: string | null
          ape_pat?: string | null
          auth_user_id?: string | null
          created_at?: string | null
          crm_client_id?: string | null
          deleted_at?: string | null
          email?: string
          id?: string
          name?: string
          onboarding_paso?: number
          onboarding_terminado_at?: string | null
          password_temporal?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "dchplm_menu_clients_crm_client_id_fkey"
            columns: ["crm_client_id"]
            isOneToOne: false
            referencedRelation: "crm_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      dchplm_menu_giros: {
        Row: {
          active: boolean
          created_at: string
          deleted_at: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          deleted_at?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          active?: boolean
          created_at?: string
          deleted_at?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      dchplm_menu_item_variant_options: {
        Row: {
          additional_price: number
          deleted_at: string | null
          display_order: number
          id: string
          name: string
          variant_id: string
        }
        Insert: {
          additional_price?: number
          deleted_at?: string | null
          display_order?: number
          id?: string
          name: string
          variant_id: string
        }
        Update: {
          additional_price?: number
          deleted_at?: string | null
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
          deleted_at: string | null
          display_order: number
          id: string
          is_required: boolean
          item_id: string
          multi_select: boolean
          name: string
        }
        Insert: {
          deleted_at?: string | null
          display_order?: number
          id?: string
          is_required?: boolean
          item_id: string
          multi_select?: boolean
          name: string
        }
        Update: {
          deleted_at?: string | null
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
          deleted_at: string | null
          description: string | null
          id: string
          image_path: string | null
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
          deleted_at?: string | null
          description?: string | null
          id?: string
          image_path?: string | null
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
          deleted_at?: string | null
          description?: string | null
          id?: string
          image_path?: string | null
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
      dchplm_menu_payments: {
        Row: {
          amount: number
          billing_period: string
          client_id: string
          created_at: string
          currency: string
          deleted_at: string | null
          id: string
          method: Database["public"]["Enums"]["dchplm_payment_method"] | null
          notes: string | null
          paid_at: string | null
          period_end: string | null
          period_start: string
          plan_id: string | null
          reference: string | null
          registered_by: string | null
          renewal_date: string | null
          status: Database["public"]["Enums"]["dchplm_payment_status"]
          subscription_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          billing_period: string
          client_id: string
          created_at?: string
          currency?: string
          deleted_at?: string | null
          id?: string
          method?: Database["public"]["Enums"]["dchplm_payment_method"] | null
          notes?: string | null
          paid_at?: string | null
          period_end?: string | null
          period_start: string
          plan_id?: string | null
          reference?: string | null
          registered_by?: string | null
          renewal_date?: string | null
          status?: Database["public"]["Enums"]["dchplm_payment_status"]
          subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          billing_period?: string
          client_id?: string
          created_at?: string
          currency?: string
          deleted_at?: string | null
          id?: string
          method?: Database["public"]["Enums"]["dchplm_payment_method"] | null
          notes?: string | null
          paid_at?: string | null
          period_end?: string | null
          period_start?: string
          plan_id?: string | null
          reference?: string | null
          registered_by?: string | null
          renewal_date?: string | null
          status?: Database["public"]["Enums"]["dchplm_payment_status"]
          subscription_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dchplm_menu_payments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menu_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dchplm_menu_payments_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menu_subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dchplm_menu_payments_registered_by_fkey"
            columns: ["registered_by"]
            isOneToOne: false
            referencedRelation: "crm_usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dchplm_menu_payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menu_client_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      dchplm_menu_solicitudes: {
        Row: {
          apellido_materno: string
          apellido_paterno: string
          atendida_en: string | null
          client_id: string | null
          correo: string
          created_at: string
          deleted_at: string | null
          estado: string
          facebook_url: string | null
          id: string
          instagram_url: string | null
          negocio: string
          nombre: string
          notas: string | null
          telefono: string
          tiktok_url: string | null
        }
        Insert: {
          apellido_materno: string
          apellido_paterno: string
          atendida_en?: string | null
          client_id?: string | null
          correo: string
          created_at?: string
          deleted_at?: string | null
          estado?: string
          facebook_url?: string | null
          id?: string
          instagram_url?: string | null
          negocio: string
          nombre: string
          notas?: string | null
          telefono: string
          tiktok_url?: string | null
        }
        Update: {
          apellido_materno?: string
          apellido_paterno?: string
          atendida_en?: string | null
          client_id?: string | null
          correo?: string
          created_at?: string
          deleted_at?: string | null
          estado?: string
          facebook_url?: string | null
          id?: string
          instagram_url?: string | null
          negocio?: string
          nombre?: string
          notas?: string | null
          telefono?: string
          tiktok_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dchplm_menu_solicitudes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menu_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      dchplm_menu_subscription_plans: {
        Row: {
          active: boolean
          allow_social_links: boolean
          allow_stats: boolean
          can_customize_brand: boolean
          created_at: string | null
          deleted_at: string | null
          has_ads: boolean
          id: string
          max_featured: number
          max_items: number
          max_menus: number
          name: string
          price_monthly: number
          price_yearly: number
        }
        Insert: {
          active?: boolean
          allow_social_links?: boolean
          allow_stats?: boolean
          can_customize_brand?: boolean
          created_at?: string | null
          deleted_at?: string | null
          has_ads?: boolean
          id?: string
          max_featured?: number
          max_items?: number
          max_menus?: number
          name: string
          price_monthly?: number
          price_yearly?: number
        }
        Update: {
          active?: boolean
          allow_social_links?: boolean
          allow_stats?: boolean
          can_customize_brand?: boolean
          created_at?: string | null
          deleted_at?: string | null
          has_ads?: boolean
          id?: string
          max_featured?: number
          max_items?: number
          max_menus?: number
          name?: string
          price_monthly?: number
          price_yearly?: number
        }
        Relationships: []
      }
      dchplm_menu_views: {
        Row: {
          device: string | null
          hits: number
          id: string
          is_bot: boolean
          last_seen_at: string
          menu_id: string
          referrer_host: string | null
          started_at: string
          view_date: string
          visitor_hash: string
        }
        Insert: {
          device?: string | null
          hits?: number
          id?: string
          is_bot?: boolean
          last_seen_at?: string
          menu_id: string
          referrer_host?: string | null
          started_at?: string
          view_date: string
          visitor_hash: string
        }
        Update: {
          device?: string | null
          hits?: number
          id?: string
          is_bot?: boolean
          last_seen_at?: string
          menu_id?: string
          referrer_host?: string | null
          started_at?: string
          view_date?: string
          visitor_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "dchplm_menu_views_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menus"
            referencedColumns: ["id"]
          },
        ]
      }
      dchplm_menus: {
        Row: {
          active: boolean
          address: string | null
          banner_path: string | null
          banner_url: string | null
          client_id: string
          created_at: string | null
          deleted_at: string | null
          description: string | null
          facebook_url: string | null
          giro_id: string | null
          hours_json: Json | null
          id: string
          instagram_url: string | null
          lat: string | null
          lng: string | null
          logo_path: string | null
          logo_url: string | null
          name: string
          phone: string | null
          primary_color: string | null
          secondary_color: string | null
          show_on_landing: boolean
          slug: string
          tiktok_url: string | null
          whatsapp_phone: string | null
        }
        Insert: {
          active?: boolean
          address?: string | null
          banner_path?: string | null
          banner_url?: string | null
          client_id: string
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          facebook_url?: string | null
          giro_id?: string | null
          hours_json?: Json | null
          id?: string
          instagram_url?: string | null
          lat?: string | null
          lng?: string | null
          logo_path?: string | null
          logo_url?: string | null
          name: string
          phone?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          show_on_landing?: boolean
          slug: string
          tiktok_url?: string | null
          whatsapp_phone?: string | null
        }
        Update: {
          active?: boolean
          address?: string | null
          banner_path?: string | null
          banner_url?: string | null
          client_id?: string
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          facebook_url?: string | null
          giro_id?: string | null
          hours_json?: Json | null
          id?: string
          instagram_url?: string | null
          lat?: string | null
          lng?: string | null
          logo_path?: string | null
          logo_url?: string | null
          name?: string
          phone?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          show_on_landing?: boolean
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
            foreignKeyName: "dchplm_menus_giro_id_fkey"
            columns: ["giro_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menu_giros"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      dchplm_menu_device_daily: {
        Row: {
          device: string | null
          loads: number | null
          menu_id: string | null
          view_date: string | null
          visits: number | null
        }
        Relationships: [
          {
            foreignKeyName: "dchplm_menu_views_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menus"
            referencedColumns: ["id"]
          },
        ]
      }
      dchplm_menu_source_daily: {
        Row: {
          loads: number | null
          menu_id: string | null
          referrer_host: string | null
          view_date: string | null
          visits: number | null
        }
        Relationships: [
          {
            foreignKeyName: "dchplm_menu_views_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menus"
            referencedColumns: ["id"]
          },
        ]
      }
      dchplm_menu_view_daily: {
        Row: {
          loads: number | null
          menu_id: string | null
          view_date: string | null
          visitors: number | null
          visits: number | null
        }
        Relationships: [
          {
            foreignKeyName: "dchplm_menu_views_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "dchplm_menus"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      crm_eliminar_contacto: { Args: { p_id: string }; Returns: undefined }
      crm_es_del_crm: { Args: never; Returns: boolean }
      crm_es_superadmin: { Args: never; Returns: boolean }
      crm_es_usuario_activo: { Args: never; Returns: boolean }
      crm_llave_servicio: { Args: never; Returns: string }
      crm_origen_normalizado: { Args: { p_origen: string }; Returns: string }
      crm_origenes_normalizados: {
        Args: { p_origenes: string[] }
        Returns: {
          crudo: string
          limpio: string
        }[]
      }
      crm_registrar_acceso: { Args: never; Returns: undefined }
      dchplm_aplicar_plan_a_cliente: {
        Args: { p_client_id: string }
        Returns: undefined
      }
      dchplm_asignar_plan: {
        Args: {
          p_email: string
          p_meses?: number
          p_pagado?: number
          p_plan: string
        }
        Returns: {
          amount_paid: number
          billing_period: string
          client_id: string
          created_at: string | null
          deleted_at: string | null
          end_date: string | null
          id: string
          plan_id: string
          start_date: string
        }
        SetofOptions: {
          from: "*"
          to: "dchplm_menu_client_subscriptions"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      dchplm_avanzar_onboarding: { Args: { paso: number }; Returns: number }
      dchplm_current_client_id: { Args: never; Returns: string }
      dchplm_current_plan_id: { Args: { p_client_id: string }; Returns: string }
      dchplm_eliminar_cliente: {
        Args: { p_client_id: string }
        Returns: {
          menu_id: string
        }[]
      }
      dchplm_menu_view_total: {
        Args: { p_desde: string; p_menu_id: string }
        Returns: number
      }
      dchplm_plan_vigente: {
        Args: { p_client_id: string }
        Returns: {
          active: boolean
          allow_social_links: boolean
          allow_stats: boolean
          can_customize_brand: boolean
          created_at: string | null
          deleted_at: string | null
          has_ads: boolean
          id: string
          max_featured: number
          max_items: number
          max_menus: number
          name: string
          price_monthly: number
          price_yearly: number
        }
        SetofOptions: {
          from: "*"
          to: "dchplm_menu_subscription_plans"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      dchplm_register_menu_view: {
        Args: {
          p_device?: string
          p_is_bot?: boolean
          p_menu_id: string
          p_referrer_host?: string
          p_visitor_hash: string
        }
        Returns: string
      }
      slugify: { Args: { v_text: string }; Returns: string }
    }
    Enums: {
      crm_payment_method:
        | "cash"
        | "transfer"
        | "card"
        | "check"
        | "deposit"
        | "other"
      crm_payment_recurrence: "none" | "monthly" | "quarterly" | "yearly"
      crm_payment_status: "pending" | "paid" | "cancelled"
      crm_user_role: "superadmin" | "admin"
      crm_user_status: "activo" | "inactivo"
      dchplm_payment_method:
        | "efectivo"
        | "transferencia"
        | "tarjeta"
        | "deposito"
        | "otro"
      dchplm_payment_status: "pendiente" | "pagado" | "vencido" | "cancelado"
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
    Enums: {
      crm_payment_method: [
        "cash",
        "transfer",
        "card",
        "check",
        "deposit",
        "other",
      ],
      crm_payment_recurrence: ["none", "monthly", "quarterly", "yearly"],
      crm_payment_status: ["pending", "paid", "cancelled"],
      crm_user_role: ["superadmin", "admin"],
      crm_user_status: ["activo", "inactivo"],
      dchplm_payment_method: [
        "efectivo",
        "transferencia",
        "tarjeta",
        "deposito",
        "otro",
      ],
      dchplm_payment_status: ["pendiente", "pagado", "vencido", "cancelado"],
    },
  },
} as const
