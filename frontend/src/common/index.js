const backendDomain = "http://localhost:8999";

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/v1/users/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/v1/users/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomain}/api/v1/users/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomain}/api/v1/users/user-logout`,
    method: "get",
  },
  allUsers: {
    url: `${backendDomain}/api/v1/users/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/api/v1/users/update-user`,
    method: "post",
  },
  // works
  uploadWork: {
    url: `${backendDomain}/api/v1/works/upload-work`,
    method: "post",
  },
  // tasks
  uploadTask: {
    url: `${backendDomain}/api/v1/works/upload-task`,
    method: "post",
  },
  // order request
  orderRequest: {
    url: `${backendDomain}/api/v1/works/order-request`,
    method: "post",
  },
  // get all orders
  allOrders: {
    url: `${backendDomain}/api/v1/works/all-orders`,
    method: "get",
  },
  // get all Tasks
  allTasks: {
    url: `${backendDomain}/api/v1/works/all-tasks`,
    method: "get",
  },
  getAllWorks: {
    url: `${backendDomain}/api/v1/works/get-works`,
    method: "get",
  },
  updateWork: {
    url: `${backendDomain}/api/v1/works/update-work`,
    method: "post",
  },
  workDetails: {
    url: `${backendDomain}/api/v1/works/work-details`,
    method: "post",
  },
  addToInterested: {
    url: `${backendDomain}/api/v1/works/addToInterested`,
    method: "post",
  },
  countInterestedWork: {
    url: `${backendDomain}/api/v1/works/countInterestedWork`,
    method: "get",
  },
  favouriteViewWork: {
    url: `${backendDomain}/api/v1/works/interested-view-work`,
    method: "get",
  },
  updateInterestedWork: {
    url: `${backendDomain}/api/v1/works/update-interested-work`,
    method: "post",
  },
  deleteInterestedWork: {
    url: `${backendDomain}/api/v1/works/delete-interested-work`,
    method: "post",
  },
  searchWork: {
    url: `${backendDomain}/api/v1/works/searchWork`,
    method: "get",
  },
  filterWork: {
    url: `${backendDomain}/api/v1/works/filter-work`,
    method: "post",
  },
  // category
  categoryWork: {
    url: `${backendDomain}/api/v1/category/get-categoryWork`,
    method: "get",
  },
  categoryAllWorks: {
    url: `${backendDomain}/api/v1/category/category-work`,
    method: "post",
  },
};

export default SummaryApi;
