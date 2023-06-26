import { db } from "@/lib/db";
import ActivateVerification from "./Verification";

interface ActivateProps {
  params: {
    token: string;
  };
}

const Activate = async ({ params }: ActivateProps) => {
  const { token } = params;

  const user = await db.user.findFirst({
    where: {
      activateTokens: {
        some: {
          AND: [
            {
              activatedAt: null,
            },
            {
              createdAt: {
                gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
              },
            },
            {
              token,
            },
          ],
        },
      },
    },
  });
  if (!user) {
    return <div className="mx-auto text-center font-semibold text-foreground">Something Went Wrong!</div>;
  }

  try {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        active: true,
      },
    });

    await db.activateToken.update({
      where: {
        token,
      },
      data: {
        activatedAt: new Date(),
      },
    });

    return <ActivateVerification email={user.email} password={user.hashedPassword} />;
  } catch (error) {
    return <div>{error}</div>;
  }
};

export default Activate;
