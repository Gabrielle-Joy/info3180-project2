"""empty message

Revision ID: 318c9dfeeec0
Revises: 2484f8cd0b0e
Create Date: 2020-05-16 16:08:31.318616

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '318c9dfeeec0'
down_revision = '2484f8cd0b0e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'gender')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('gender', sa.VARCHAR(length=6), autoincrement=False, nullable=False))
    # ### end Alembic commands ###
