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
      customers: {
        Row: {
          address: string
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
        }
        Insert: {
          address: string
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
        }
        Update: {
          address?: string
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      employees: {
        Row: {
          birthAt: string | null
          created_at: string
          email: string
          hiredAt: string
          id: string
          name: string
          phone: string
          role: string
        }
        Insert: {
          birthAt?: string | null
          created_at?: string
          email: string
          hiredAt: string
          id?: string
          name: string
          phone: string
          role: string
        }
        Update: {
          birthAt?: string | null
          created_at?: string
          email?: string
          hiredAt?: string
          id?: string
          name?: string
          phone?: string
          role?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          orderId: string
          productId: string
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: string
          orderId: string
          productId: string
          quantity?: number
        }
        Update: {
          created_at?: string
          id?: string
          orderId?: string
          productId?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          createdAt: string
          customerId: string
          deliveredAt: string | null
          deliveryMethod: number | null
          id: string
          paymentMethod: number
          paymentStatus: Database["public"]["Enums"]["paymentStatus"]
          shippedAt: string | null
          status: Database["public"]["Enums"]["orderStatus"]
          totalAmount: number
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string
          customerId: string
          deliveredAt?: string | null
          deliveryMethod?: number | null
          id?: string
          paymentMethod: number
          paymentStatus?: Database["public"]["Enums"]["paymentStatus"]
          shippedAt?: string | null
          status: Database["public"]["Enums"]["orderStatus"]
          totalAmount?: number
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string
          customerId?: string
          deliveredAt?: string | null
          deliveryMethod?: number | null
          id?: string
          paymentMethod?: number
          paymentStatus?: Database["public"]["Enums"]["paymentStatus"]
          shippedAt?: string | null
          status?: Database["public"]["Enums"]["orderStatus"]
          totalAmount?: number
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customerId_fkey"
            columns: ["customerId"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: Database["public"]["Enums"]["categories"]
          created_at: string
          description: string
          id: string
          imageUrl: string | null
          isActive: string
          name: string
          price: number
          rating: number | null
          reviews: number | null
          stock: number
        }
        Insert: {
          category: Database["public"]["Enums"]["categories"]
          created_at?: string
          description: string
          id?: string
          imageUrl?: string | null
          isActive: string
          name: string
          price: number
          rating?: number | null
          reviews?: number | null
          stock: number
        }
        Update: {
          category?: Database["public"]["Enums"]["categories"]
          created_at?: string
          description?: string
          id?: string
          imageUrl?: string | null
          isActive?: string
          name?: string
          price?: number
          rating?: number | null
          reviews?: number | null
          stock?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      categories:
        | "smartphone"
        | "keyboard"
        | "watch"
        | "tablet"
        | "laptop"
        | "earbuds"
      orderStatus:
        | "pending"
        | "delivered"
        | "shipped"
        | "cancelled"
        | "processing"
      paymentStatus: "pending" | "paid" | "failed"
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
      categories: [
        "smartphone",
        "keyboard",
        "watch",
        "tablet",
        "laptop",
        "earbuds",
      ],
      orderStatus: [
        "pending",
        "delivered",
        "shipped",
        "cancelled",
        "processing",
      ],
      paymentStatus: ["pending", "paid", "failed"],
    },
  },
} as const
