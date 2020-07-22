export const isUserAuthenticated = (request) => {
  if (!request.account) {
    throw Error("로그인 후 이용해주세요.");
  }
};

export const isAdminAuthenticated = (request) => {
  if (!request.account) {
    throw Error("로그인 후 이용해주세요.");
  }
  if (request.account.role !== "Administrator") {
    throw Error("관리자 계정이 아닙니다.");
  }
  return;
};
