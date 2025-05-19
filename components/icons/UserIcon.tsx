import type React from "react"
import { LucideUser } from "lucide-react"

export default function UserIcon(props: React.ComponentProps<typeof LucideUser>) {
  return <LucideUser {...props} />
}
