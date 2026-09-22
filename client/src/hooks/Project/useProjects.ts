import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getProjects,
  getProjectById,
  applyToProject,
  getProjectApplications,
  acceptProjectApplication,
  rejectProjectApplication,
  withdrawApplication,
  removeFromProject,
  createProject,
  updateProjectImage,
  completeProject
} from "../../API/User/Project/project.api";
import toast from "react-hot-toast";


export const projectKeys = {
  all: ["projects"] as const,

  lists: () => [...projectKeys.all, "list"] as const,

  detail: (id: string) =>
    [...projectKeys.all, "detail", id] as const,

  applications: (id: string) =>
    [...projectKeys.all, "applications", id] as const,
};


export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,

    onSuccess: () => {
      // Refresh project list
      queryClient.invalidateQueries({
        queryKey: projectKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      toast.success("Project created successfully");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create project"
      );
    },
  });
};

export const useProjects = () => {
  return useQuery({
    queryKey: projectKeys.lists(),
    queryFn: getProjects,
  });
};


export const useProject = (projectId: string) => {
  return useQuery({
    queryKey: projectKeys.detail(projectId),
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
  });
};


export const useApplyToProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyToProject,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(variables.projectId),
      });

      queryClient.invalidateQueries({
        queryKey: projectKeys.lists(),
      });

      toast.success("application has been sent")
    },

    onError: (error: any) => {
      toast.error(
        "Failed to apply to project:",
        error
      );
    },
  });
};


export const useProjectApplications = (
  projectId: string,
  enabled = true
) => {
  return useQuery({
    queryKey: projectKeys.applications(projectId),
    queryFn: () =>
      getProjectApplications(projectId),
    enabled: !!projectId && enabled,
  });
};


export const useAcceptApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptProjectApplication,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(
          variables.projectId
        ),
      });
      queryClient.invalidateQueries({ queryKey: ["me"] });


      queryClient.invalidateQueries({
        queryKey: projectKeys.applications(
          variables.projectId
        ),
      });
    },
  });
};


export const useRejectApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectProjectApplication,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.applications(
          variables.projectId
        ),
      });

      toast.success("application rejected");
    },
  });
};


export const useWithdrawApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: withdrawApplication,

    onSuccess: (_, projectId) => {
      // Refresh project detail
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(projectId),
      });

      // Refresh applications
      queryClient.invalidateQueries({
        queryKey: projectKeys.applications(projectId),
      });

      // Refresh project list
      queryClient.invalidateQueries({
        queryKey: projectKeys.lists(),
      });

      toast.success("application withdrawn")
    },
  });
};



export const useRemoveFromProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      memberId,
    }: {
      projectId: string;
      memberId: string;
    }) => removeFromProject(projectId, memberId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(variables.projectId),
      });

    queryClient.invalidateQueries({ queryKey: ["me"] });

      queryClient.invalidateQueries({
        queryKey: projectKeys.applications(
          variables.projectId
        ),
      });

      queryClient.invalidateQueries({
        queryKey: projectKeys.lists(),
      });

      toast.success("Member removed from project");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to remove member"
      );
    },
  });
};


export const useUpdateProjectImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProjectImage,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(
          variables.projectId
        ),
      });

      queryClient.invalidateQueries({
        queryKey: projectKeys.lists(),
      });
    },
  });
};


export const useCompleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeProject,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(
          variables.projectId
        ),
      });

      queryClient.invalidateQueries({
        queryKey: projectKeys.lists(),
      });
    },
  });
};