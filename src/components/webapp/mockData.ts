export interface ChatSession {
  id: string;
  title: string;
  timestamp: string;
  category: "Today" | "Yesterday" | "Previous";
  mode: "single" | "compare";
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  modelA?: string;
  contentB?: string;
  modelB?: string;
  timestamp: string;
  metrics?: {
    latencyA?: string;
    tokensA?: number;
    latencyB?: string;
    tokensB?: number;
  };
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: "Coding" | "Writing" | "Analysis" | "Productivity";
  prompt: string;
  suggestedModel: string;
}

export const INITIAL_SESSIONS: ChatSession[] = [
  {
    id: "session-1",
    title: "Next.js 16 Server Actions Architecture",
    timestamp: "10 mins ago",
    category: "Today",
    mode: "compare",
    messages: [
      {
        id: "msg-1",
        role: "user",
        content: "What is the cleanest way to structure server mutations with optimistic UI updates in Next.js 16?",
        timestamp: "10:14 AM",
      },
      {
        id: "msg-2",
        role: "assistant",
        modelA: "Claude 3.5 Sonnet",
        content: `In Next.js 16 with React 19, the cleanest architectural pattern uses \`useActionState\` and \`useOptimistic\` directly alongside standalone server actions:

\`\`\`tsx
"use client";
import { useActionState, useOptimistic } from "react";
import { updateProfile } from "@/lib/api/actions";

export function ProfileForm({ user }: { user: User }) {
  const [state, formAction, isPending] = useActionState(updateProfile, null);
  const [optimisticUser, setOptimisticUser] = useOptimistic(
    user,
    (current, update: Partial<User>) => ({ ...current, ...update })
  );

  return (
    <form action={async (formData) => {
      const name = formData.get("name") as string;
      setOptimisticUser({ name });
      await formAction(formData);
    }}>
      <input name="name" defaultValue={optimisticUser.name} />
      <button disabled={isPending}>Save Profile</button>
    </form>
  );
}
\`\`\`

**Key advantages:**
1. Zero client-side state store overhead (no Redux or Zustand needed).
2. Native browser progressive enhancement.
3. Instant optimistic feedback with automatic rollback on network failure.`,
        modelB: "GPT-4o",
        contentB: `Here is the production-grade approach using React 19 Actions in Next.js 16:

\`\`\`typescript
// src/app/actions/user.ts
"use server";
import { revalidatePath } from "next/cache";

export async function updateUserData(prevState: any, formData: FormData) {
  const name = formData.get("name")?.toString();
  if (!name || name.length < 2) {
    return { error: "Name must be at least 2 characters" };
  }

  await db.users.updateOne({ id: 1 }, { $set: { name } });
  revalidatePath("/dashboard");
  return { success: true };
}
\`\`\`

**Pro Tips:**
• Keep database connection pooling global across Server Action calls.
• Always return serializable error objects rather than throwing unhandled exceptions.
• Pair with \`revalidatePath\` or \`revalidateTag\` to invalidate server cache.`,
        timestamp: "10:14 AM",
        metrics: {
          latencyA: "210ms",
          tokensA: 342,
          latencyB: "185ms",
          tokensB: 298,
        },
      },
    ],
  },
  {
    id: "session-2",
    title: "DeepSeek vs GPT-4o Math Proof",
    timestamp: "1 hour ago",
    category: "Today",
    mode: "single",
    messages: [
      {
        id: "msg-201",
        role: "user",
        content: "Prove that the sum of angles in any planar triangle is always 180 degrees.",
        timestamp: "9:20 AM",
      },
      {
        id: "msg-202",
        role: "assistant",
        modelA: "DeepSeek R1",
        content: `**Euclidean Geometric Proof via Alternate Interior Angles:**

1. Consider any triangle $\\triangle ABC$ with vertices $A$, $B$, and $C$.
2. Construct a line $L$ passing through vertex $A$ that is parallel to the opposite side $BC$ (guaranteed by Euclid's Parallel Postulate).
3. The straight line $L$ forming a flat angle at $A$ measures exactly $180^\\circ$.
4. By the Alternate Interior Angles Theorem:
   - The angle between $L$ (left segment) and $AB$ equals $\\angle B$.
   - The angle between $L$ (right segment) and $AC$ equals $\\angle C$.
5. Therefore:
   $$\\angle B + \\angle A + \\angle C = 180^\\circ$$
   
$$\\blacksquare \\text{ Q.E.D.}$$`,
        timestamp: "9:20 AM",
        metrics: {
          latencyA: "320ms",
          tokensA: 195,
        },
      },
    ],
  },
  {
    id: "session-3",
    title: "Chrome Extension Content Script Bridge",
    timestamp: "Yesterday",
    category: "Yesterday",
    mode: "single",
    messages: [],
  },
  {
    id: "session-4",
    title: "Tailwind CSS v4 Container Queries",
    timestamp: "3 days ago",
    category: "Previous",
    mode: "single",
    messages: [],
  },
];

export const CURATED_PROMPTS: PromptTemplate[] = [
  {
    id: "p1",
    title: "Code Review & Security Audit",
    category: "Coding",
    suggestedModel: "Claude 3.5 Sonnet",
    prompt: "Review this code for potential memory leaks, race conditions, OWASP Top 10 security vulnerabilities, and provide refactored code with explanations.",
  },
  {
    id: "p2",
    title: "System Architecture RFC",
    category: "Coding",
    suggestedModel: "Claude 3.5 Sonnet",
    prompt: "Draft an architectural RFC for migrating a monolithic app to an event-driven microservices setup using Kafka and Redis caching.",
  },
  {
    id: "p3",
    title: "Executive Page Summary",
    category: "Analysis",
    suggestedModel: "Gemini 1.5 Pro",
    prompt: "Extract the core thesis, top 3 empirical data points, potential methodological flaws, and high-impact conclusions from this text in bulleted format.",
  },
  {
    id: "p4",
    title: "High-Converting Product Launch Copy",
    category: "Writing",
    suggestedModel: "GPT-4o",
    prompt: "Write a punchy LinkedIn and Twitter launch thread highlighting the 3 major features of our new release with clear CTAs and zero marketing fluff.",
  },
  {
    id: "p5",
    title: "Algorithmic Complexity Proof",
    category: "Analysis",
    suggestedModel: "DeepSeek R1",
    prompt: "Analyze the time and space complexity of this dynamic programming solution and prove whether a greedy or divide-and-conquer approach can achieve O(n log n).",
  },
];
