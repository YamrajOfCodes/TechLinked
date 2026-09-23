"use client";

import { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  ExternalLink,
  GitBranch,
} from "lucide-react";

import {
  useProject,
  useRemoveFromProject,
  useUpdateProjectImage,
  useCompleteProject,
  useWithdrawApplication,
} from "../../../../src/hooks/Project/useProjects";

import ProjectDetailSkeleton from "@/src/components/User/Projects/ProjectDetail/ProjectDetailSkeleton";
import TeamSection from "@/src/components/User/Projects/ProjectDetail/TeamSection";
import OwnerApplications from "@/src/components/User/Projects/ProjectDetail/OwnerApplications";
import ProjectActionCard from "@/src/components/User/Projects/ProjectDetail/ProjectActionCard";
import OwnerCard from "@/src/components/User/Projects/ProjectDetail/OwnerCard";
import ConfirmModal from "@/src/components/Models/ConfirmModal";
import ProjectImageModal from "@/src/components/Models/ProjectImageModal";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();

  const projectId = params.projectId as string;

  const {
    data: project,
    isLoading,
    isError,
  } = useProject(projectId);


  const {
    mutate: withdrawApplication,
    isPending: isWithdrawing,
  } = useWithdrawApplication();

  const [withdrawApplicationModal, setWithdrawApplicationModal] =
    useState(false);

  const [applicationId, setApplicationId] = useState("");


  const prewithdraw = (id: string) => {
    setApplicationId(id);
    setWithdrawApplicationModal(true);
  };

  const handleWithDraw = () => {
    if (!applicationId) return;

    withdrawApplication(applicationId, {
      onSuccess: () => {
        setWithdrawApplicationModal(false);
        setApplicationId("");
      },
    });
  };

  const [memberId, setMemberId] = useState("");

  const [removeMemberModal, setRemoveMemberModal] =
    useState(false);

  const {
    mutate: removeMember,
    isPending: isRemovingMember,
  } = useRemoveFromProject();

  const handlePreRemoveMember = (id: string) => {
    setMemberId(id);
    setRemoveMemberModal(true);
  };

  const handleRemoveMember = () => {
    if (!memberId) return;

    removeMember(
      {
        projectId,
        memberId,
      },
      {
        onSuccess: () => {
          setMemberId("");
          setRemoveMemberModal(false);
        },
      }
    );
  };


  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  const {
    mutate: updateProjectImage,
    isPending: isUploadingImage,
  } = useUpdateProjectImage();

  const handleSelectImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG and WebP images are allowed.");
      event.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Image size must be less than 5MB.");
      event.target.value = "";
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const objectUrl = URL.createObjectURL(file);

    setSelectedImage(file);
    setPreviewUrl(objectUrl);

    event.target.value = "";
  };

  const handleCloseImageModal = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedImage(null);
    setPreviewUrl(null);
  };

  const handleUploadImage = () => {
    if (!selectedImage) return;

    updateProjectImage(
      {
        projectId,
        image: selectedImage,
      },
      {
        onSuccess: () => {
          handleCloseImageModal();
        },
      }
    );
  };

  const [completeProjectModal, setCompleteProjectModal] =
    useState(false);

  const {
    mutate: completeProject,
    isPending: isCompleting,
  } = useCompleteProject();

  const handleCompleteProject = () => {
    completeProject(
      {
        projectId,
      },
      {
        onSuccess: () => {
          setCompleteProjectModal(false);
        },
      }
    );
  };


  if (isLoading) {
    return <ProjectDetailSkeleton />;
  }

  if (isError || !project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f5f1]">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Project not found
          </h2>

          <button
            onClick={() => router.back()}
            className="mt-4 text-sm font-medium text-[#397A68]"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  console.log(project.status)

  const isCompleted = project.status === "COMPLETED";

  return (
    <main className="min-h-screen bg-[#f8f5f1]">
      <div className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 md:px-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
          >
            <ArrowLeft size={17} />
            Back to projects
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">

          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">

              <div className="relative">

                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="
                      h-64
                      w-full
                      object-cover
                      md:h-80
                    "
                  />
                ) : (
                  <div
                    className=" flex h-64 w-full items-center justify-center bg-gray-100 md:h-80 "
                  >
                    <div className="text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white">
                        <Camera
                          size={20}
                          className="text-gray-400"
                        />
                      </div>

                      <p className="mt-2 text-sm text-gray-400">
                        No project image
                      </p>
                    </div>
                  </div>
                )}

                {project.viewer.isOwner && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-black/5 bg-white shadow-lg transition hover:bg-gray-50"
                      title="Change project image"
                    >
                      <Camera
                        size={19}
                        className="text-gray-700"
                      />
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={handleSelectImage}
                    />
                  </>
                )}

              </div>

              <div className="p-6">

                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0">

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold
                        ${
                          isCompleted
                            ? "bg-green-50 text-green-700"
                            : "bg-[#e9f0ed] text-[#397A68]"
                        }
                      `}
                    >
                      {isCompleted && (
                        <CheckCircle2 size={13} />
                      )}

                      {project.status}
                    </span>

                    <h1
                      className="mt-4 text-2xl font-bold leading-tight text-gray-900 md:text-3xl"
                    >
                      {project.title}
                    </h1>

                  </div>

                  {/* COMPLETE PROJECT */}

                  {project.viewer.isOwner && !isCompleted && (
                      <button
                        type="button"
                        onClick={() =>
                          setCompleteProjectModal(true)
                        }
                        disabled={isCompleting}
                        className=" flex shrink-0 items-center gap-2 rounded-lg bg-[#397A68] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#306b5c] disabled:cursor-not-allowed disabled:opacity-60"                      >
                        <CheckCircle2 size={16} />

                        Complete Project
                      </button>
                    )}

                </div>

                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-gray-600">
                  {project.description ||
                    "No description provided."}
                </p>

                {/* PROJECT LINKS */}

                {(project.githubUrl ||
                  project.projectUrl) && (
                  <div className="mt-5 flex flex-wrap gap-3">

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        <GitBranch size={16} />
                        GitHub
                        <ExternalLink size={13} />
                      </a>
                    )}

                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"                      >
                        <ExternalLink size={16} />
                        Project
                      </a>
                    )}

                  </div>
                )}

              </div>
            </div>

            <TeamSection
              project={project}
              handlePreRemoveMember={
                handlePreRemoveMember
              }
            />

            {project.viewer.isOwner && (
              <OwnerApplications
                projectId={project.id}
              />
            )}

          </div>

          <aside className="space-y-5">

            <ProjectActionCard
              project={project}
              isWithdrawing={isWithdrawing}
              prewithdraw={prewithdraw}
            />

            <OwnerCard project={project} />

          </aside>

        </div>
      </div>

      {/* Models */}

      {selectedImage && previewUrl && (
        <ProjectImageModal
          isOpen={true}
          imageUrl={previewUrl}
          onClose={handleCloseImageModal}
          onConfirm={handleUploadImage}
          isLoading={isUploadingImage}
        />
      )}


      {completeProjectModal && (
        <ConfirmModal
          title="Complete Project"
          description="Are you sure you want to mark this project as completed? This will indicate that the project is finished."
          isOpen={completeProjectModal}
          onClose={() =>
            setCompleteProjectModal(false)
          }
          cancelLabel="Cancel"
          loadingLabel="Completing..."
          confirmLabel="Complete Project"
          variant="default"
          onConfirm={handleCompleteProject}
          isLoading={isCompleting}
        />
      )}

      {withdrawApplicationModal && (
        <ConfirmModal
          title="Withdraw Application"
          description="Are you sure you want to withdraw your application?"
          isOpen={withdrawApplicationModal}
          onClose={() =>
            setWithdrawApplicationModal(false)
          }
          cancelLabel="Cancel Withdraw"
          loadingLabel="Withdrawing..."
          confirmLabel="Withdraw"
          variant="default"
          onConfirm={handleWithDraw}
          isLoading={isWithdrawing}
        />
      )}

      {removeMemberModal && (
        <ConfirmModal
          title="Remove Member"
          description="Are you sure you want to remove this member?"
          isOpen={removeMemberModal}
          onClose={() =>
            setRemoveMemberModal(false)
          }
          cancelLabel="Cancel"
          loadingLabel="Removing..."
          confirmLabel="Remove"
          variant="danger"
          onConfirm={handleRemoveMember}
          isLoading={isRemovingMember}
        />
      )}

    </main>
  );
}