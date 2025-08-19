import todo from "../../assets/images/todo.svg";
import done from "../../assets/images/done.svg";
import emptyDoneSm from "../../assets/images/donesm.svg";
import emptyDoneLg from "../../assets/images/donelg.svg";
import emptyTodoSm from "../../assets/images/todosm.svg";
import emptyTodoLg from "../../assets/images/todolg.svg";
import { useQuery } from "@tanstack/react-query";
import { useTodoListQuery } from "../../apis/todo/queries/todo.query-options";
import List from "../UI/List/List";

const ListSection = () => {
  const { data } = useQuery(useTodoListQuery({ page: 1, pageSize: 100000 }));
  return (
    <section className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-x-6">
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
