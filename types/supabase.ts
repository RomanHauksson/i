export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      historical_orders: {
        Row: {
          created_at: string
          id: number
          num_shares: number | null
          order_type: string | null
          orderer_id: string | null
          price: number | null
          stock_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          num_shares?: number | null
          order_type?: string | null
          orderer_id?: string | null
          price?: number | null
          stock_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          num_shares?: number | null
          order_type?: string | null
          orderer_id?: string | null
          price?: number | null
          stock_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "historical_orders_orderer_id_fkey"
            columns: ["orderer_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "historical_orders_stock_id_fkey"
            columns: ["stock_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          created_at: string
          id: number
          num_shares: number | null
          order_type: string | null
          orderer_id: string | null
          price: number | null
          stock_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          num_shares?: number | null
          order_type?: string | null
          orderer_id?: string | null
          price?: number | null
          stock_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          num_shares?: number | null
          order_type?: string | null
          orderer_id?: string | null
          price?: number | null
          stock_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_orderer_id_fkey"
            columns: ["orderer_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_stock_id_fkey"
            columns: ["stock_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      owned_shares: {
        Row: {
          created_at: string
          id: number
          num_shares: number | null
          owner_id: string | null
          stock_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          num_shares?: number | null
          owner_id?: string | null
          stock_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          num_shares?: number | null
          owner_id?: string | null
          stock_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "owned_shares_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "owned_shares_stock_id_fkey"
            columns: ["stock_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          city: string | null
          description: string | null
          full_name: string | null
          id: string
          symbol: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          city?: string | null
          description?: string | null
          full_name?: string | null
          id: string
          symbol?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          city?: string | null
          description?: string | null
          full_name?: string | null
          id?: string
          symbol?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      trades: {
        Row: {
          buy_order_id: number | null
          created_at: string
          id: number
          num_shares: number | null
          sell_order_id: number | null
        }
        Insert: {
          buy_order_id?: number | null
          created_at?: string
          id?: number
          num_shares?: number | null
          sell_order_id?: number | null
        }
        Update: {
          buy_order_id?: number | null
          created_at?: string
          id?: number
          num_shares?: number | null
          sell_order_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "trades_buy_order_id_fkey"
            columns: ["buy_order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trades_sell_order_id_fkey"
            columns: ["sell_order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
