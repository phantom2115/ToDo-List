import todo from "../../assets/images/todo.svg";
import done from "../../assets/images/done.svg";
import emptyDoneSm from "../../assets/images/donesm.svg";
import emptyDoneLg from "../../assets/images/donelg.svg";
import emptyTodoSm from "../../assets/images/todosm.svg";
import emptyTodoLg from "../../assets/images/todolg.svg";
import { useQuery } from "@tanstack/react-query";
import { useTodoListQuery } from "../../apis/todo/queries/todo.query-options";
import List from "../UI/List/List";
import Loading from "../UI/Loading/Loading";
import { useIsFetching } from "@tanstack/react-query";
import QueryKeys from "@/apis/query-keys";

const ListSection = () => {
  // 데이터 불러오기
  const { data, isError } = useQuery(
    useTodoListQuery({ page: 1, pageSize: 100000 })
  );

  // 데이터 불러오기 실패 시 처리
  if (isError) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }

  const isListPending = useIsFetching({
    queryKey: QueryKeys.todo.all,
  });

  return (
    <section className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-x-6 pb-6">
      {isListPending > 0 && <Loading isFullScreen />}
      <List
        type={todo}
        items={data?.filter((item) => !item.isCompleted)}
        emptyMessage="할 일이 없어요."
        guideMessage="TODO를 새롭게 추가해주세요!"
        emptyImageSm={emptyTodoSm}
        emptyImageLg={emptyTodoLg}
      />
      <List
        type={done}
        items={data?.filter((item) => item.isCompleted)}
        emptyMessage="아직 다 한 일이 없어요."
        guideMessage="해야 할 일을 체크해보세요!"
        emptyImageSm={emptyDoneSm}
        emptyImageLg={emptyDoneLg}
      />
    </section>
  );
};

export default ListSection;
