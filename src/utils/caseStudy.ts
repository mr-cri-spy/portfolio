/**
 * Case studies are addressable as #work/<project-id>, so a recruiter can be sent
 * straight to one (e.g. /#work/blue-bright-hr) and the Back button closes it.
 */
export const CASE_STUDY_HASH = "#work/";

export function caseStudyHref(projectId: string): string {
  return `${CASE_STUDY_HASH}${projectId}`;
}
