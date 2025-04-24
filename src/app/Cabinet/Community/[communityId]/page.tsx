'use client'

import { Button, Flex, Typography } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { doc, updateDoc } from "firebase/firestore";
import { AppDispatch, RootState } from "@/state-management/redux/store";
import { fetchIssueData, changeIssueColumns } from "@/state-management/redux/slices/issues";
import { FIRESTORE_PATH_NAMES } from "@/utilis/constants";
import { ISSUE_OPTIONS } from "@/utilis/issues";
import AddIssueModal from "@/components/sheard/IssueModal/Add/page";
import EditIssueModal from "@/components/sheard/IssueModal/Edit/page";
import { db } from "@/services/firebase/firebase";
import { useParams } from "next/navigation";
import { issue } from "@/types/issues";
import '../../../../styles/cabinet.css';

const { Title, Text } = Typography;

const Cabinet = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editModalData, setEditModalData] = useState<issue | null>(null); 
  const { data, loading } = useSelector((state: RootState) => state.issues);
  const { communityId } = useParams();

  useEffect(() => {
    if(communityId){
        dispatch(fetchIssueData(communityId as string));
    }
  }, [dispatch]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChangeTaskStatus = async (result: any) => {
    if (!result.destination || !data) return;

    const { source, destination } = result;
    const sourceArray = [...data[source.droppableId]];
    const destinationArray = [...data[destination.droppableId]];

    if (destination.droppableId === source.droppableId) {
      const [movedItem] = sourceArray.splice(source.index, 1);
      sourceArray.splice(destination.index, 0, movedItem);
    } else {
      const [movedItem] = sourceArray.splice(source.index, 1);
      destinationArray.splice(destination.index, 0, movedItem);
    }

    try {
      dispatch(changeIssueColumns({ source, destination }));

      const updateTasks = async (arr: any[], status?: string) => {
        for (let i = 0; i < arr.length; i++) {
          const item = arr[i];
          const docRef = doc(db, FIRESTORE_PATH_NAMES.COLLABORATIONS, communityId, FIRESTORE_PATH_NAMES.ISSUES, item.taskId);
          await updateDoc(docRef, {
            taskIndex: i,
            ...(status && { status }),
          });
        }
      };

      if (source.droppableId !== destination.droppableId) {
        await updateTasks(destinationArray, destination.droppableId);
        await updateTasks(sourceArray);
      } else {
        await updateTasks(sourceArray, destination.droppableId);
      }
    } catch (e) {
      console.error("Drag update error:", e);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Create Issue
      </Button>

      <AddIssueModal isOpen={showModal} onClose={handleCloseModal} />
      {
        Boolean(editModalData) && editModalData && (
          <EditIssueModal
            isOpen={Boolean(editModalData)}
            onClose={() => setEditModalData(null)}
            data={editModalData}
          />
        )
      }

      <div className="drag_context_container">
        <DragDropContext onDragEnd={handleChangeTaskStatus}>
          {data && Object.entries(data).map(([columnId, column]) => (
            <div className="column_container" key={columnId}>
              <div className="column_header">
                <Title level={5} type="secondary">
                  {columnId} ({column.length})
                </Title>
              </div>

              <Droppable droppableId={columnId} isDropDisabled={false} isCombineEnabled={false}
                ignoreContainerClipping={false}>
              {(provided: any) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="droppable_container"
                  >
                    {column.map((item, index) => (
                      <Draggable key={item.taskId} draggableId={item.taskId} index={index}>
                        {(provided: any) => (
                          <div
                            className="issue_card_container"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => setEditModalData(item)}
                          >
                            <Flex>
                              <Text>{item.issueName}</Text>
                              <div>{ISSUE_OPTIONS[item.type]?.icon}</div>
                            </Flex>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Cabinet;