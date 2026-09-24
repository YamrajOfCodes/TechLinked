import prisma from "../../Database/prisma.js";


export const getLeaderboard = async (req, res) => {
  try {

    let userid ="";

     if(req.user){
     const {userId} = req.user;
     userid = userId
     }
    

    const users = await prisma.user.findMany({
      where: {
        impact: {
          gt: 0,
        },
      },
      select: {
        id: true,
        FirstName: true,
        LastName: true,
        impact: true,
        college: true,
        profilePhoto: true,
      },
      orderBy: [
        {
          impact: "desc",
        },
        {
          id: "asc",
        },
      ],
    });

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      id: user.id,
      name: `${user.FirstName ?? ""} ${user.LastName ?? ""}`.trim(),
      college: user.college,
      profilePhoto: user.profilePhoto,
      impactPoints: user.impact ?? 0,
    }));

    let currentUser = null;

    if (userid) {
      const index = leaderboard.findIndex(
        (user) => user.id === userid
      );

      if (index !== -1) {
        const user = leaderboard[index];

        currentUser = {
          rank: user.rank,
          impactPoints: user.impactPoints,
          pointsToNextRank:
            index === 0
              ? 0
              : Math.max(
                  0,
                  leaderboard[index - 1].impactPoints - user.impactPoints
                ),
        };
      }
    }

    return res.status(200).json({
      success: true,
      leaderboard,
      currentUser,
    });
  } catch (error) {
    console.error("Get leaderboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch leaderboard",
    });
  }
};